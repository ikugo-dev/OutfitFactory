import cloudinary_uploader
import mongodb_uploader
import links
import random
import time
import re
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium import webdriver

def parse_product(browser: WebDriver, url: str, gender: str, category: str):
    browser.get(url)
    time.sleep(random.uniform(0.5, 1.5)) # da ne bude mnogo ocigledno
    soup = BeautifulSoup(browser.page_source, "lxml")

    def safe_select(selector):
        tag = soup.select_one(selector)
        if (tag is None):
            return "N/A"
        else:
            return tag.text.strip()

    # id_value        = url[29:] # da izbrisemo "https://www.sinsay.com/rs/sr/"
    name_value      = safe_select("h1[data-testid='product-name']")
    price_value     = safe_select("div[data-selen='product-price']")
    if price_value != "N/A":
        price_value = int(price_value.replace("RSD", "").replace("\xa0", "")) # zbog whitespaces koji stavljajub
    color_value     = safe_select("span[data-testid='color-picker-color-name']")

    cloudinary_url = "N/A"
    image_tag = soup.select_one("meta[content^='https://static.sinsay.com/media/catalog/product/cache/']")
    if image_tag:
        image_url_value = image_tag.get("content")
        if image_url_value:
            cloudinary_url = cloudinary_uploader.upload(str(image_url_value))


    material_value = "N/A"
    script_tag = soup.find("script", string=re.compile("getProductData")) #type: ignore
    if script_tag:
        match = re.search('"composition_main_fabric":"([^"]+)"', script_tag.text)
        if match:
            material_value = match.group(1)

    return {
        "image_url": cloudinary_url,
        "gender": gender,
        "url": url,
        "category": category,
        "name":  name_value,
        "color": color_value,
        "material": material_value,
        "price": price_value,
        "brand": "Sinsay",
    }

def load_category_page(browser: WebDriver):
    while True:
        try:
            load_more_link = browser.find_element(By.XPATH, "//a[text()='Više proizvoda']")
            current_count = len(browser.find_elements(By.CSS_SELECTOR, 'article.es-product'))
            load_more_link.click()

            WebDriverWait(browser, 10).until(
                lambda browser: len(browser.find_elements(By.CSS_SELECTOR, 'article.es-product')) > current_count
            )
            time.sleep(random.uniform(0.5, 1.5)) # da ne bude mnogo ocigledno
        except:
            break

def extract_category_product_links(browser: WebDriver, url: str):
    browser.get(url)
    time.sleep(5)
    load_category_page(browser)

    soup = BeautifulSoup(browser.page_source, "lxml")
    links = []
    for product in soup.select('article.es-product'):
        link = product.select_one('a')
        if link != None:
            links.append((link['href']))
    return links

# if __name__ == "__main__":
#     browser = webdriver.Firefox()
#     print("Started scrapping...");
#     for category in links.categories:
#         parsed_products = []
#         product_links = extract_category_product_links(browser, category.link)
#         for product_link in product_links:
#             parsed_products.append(parse_product(browser, product_link, category.gender, category.name));
#         print(parsed_products);
#         print("Parsed " + str(len(parsed_products)) + " products!");
#         mongodb_uploader.upload(parsed_products);
#     print("Finished scrapping...!");
#     browser.close()

# prettier but more complicated implementation
if __name__ == "__main__":
    browser = webdriver.Firefox()
    print("    -> Started scraping  <-")

    total_categories = len(links.categories)
    overall_start = time.time()

    for category_index, category in enumerate(links.categories, start=1):
        print(f"Parsing category {category_index}/{total_categories}: '{category.name}' ({category.gender})")

        category_start = time.time()
        parsed_products = []

        product_links = extract_category_product_links(browser, category.link)
        total_products = len(product_links)

        print(f"Found {total_products} products in '{category.name}'.")

        for product_index, product_link in enumerate(product_links, start=1):
            start_time = time.time()
            product = parse_product(browser, product_link, category.gender, category.name)
            parsed_products.append(product)

            print(f"[{product_index}/{total_products}] elapsed {(time.time() - category_start):.1f}s")

        print(f"✅ Finished category '{category.name}'")
        mongodb_uploader.upload(parsed_products)
        print(f"✅ Uploaded {len(parsed_products)} products to MongoDB.\n")

    total_time = time.time() - overall_start
    print("    -> Finished scraping <-")
    print(f"Finished scraping all categories in {total_time/60:.1f} minutes.")
    browser.close()
