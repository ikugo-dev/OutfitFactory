import random
import time
import re
from collections import namedtuple
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

    id_value        = url[29:] # da izbrisemo "https://www.sinsay.com/rs/sr/"
    name_value      = safe_select("h1[data-testid='product-name']")
    price_value     = safe_select("div[data-selen='product-price']").replace('\xa0', ' ') # zbog whitespaces koji stavljaju
    color_value     = safe_select("span[data-testid='color-picker-color-name']")

    image_tag = soup.select_one("meta[content^='https://static.sinsay.com/media/catalog/product/cache/']")
    image_url_value = image_tag.get("content") if image_tag else "N/A"

    material_value = "N/A"
    script_tag = soup.find("script", string=re.compile("getProductData")) #type: ignore
    if script_tag:
        match = re.search('"composition_main_fabric":"([^"]+)"', script_tag.text)
        if match:
            material_value = match.group(1)

    return {
        "id": id_value,
        "image_url": image_url_value,
        "gender": gender,
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

Category = namedtuple('Category', 'link gender name')
categories = [
    Category("https://www.sinsay.com/rs/sr/muskarac/odeca/farmerke", "m", "farmerke")
]

if __name__ == "__main__":
    browser = webdriver.Firefox()
    print(parse_product(browser, "https://www.sinsay.com/rs/sr/jogger-farmerke-445fb-90j", "m", "farmerke"))
    # for category in categories:
    #     product_links = extract_category_product_links(browser, category.link)
    #     for product_link in product_links:
    #         print(parse_product(browser, product_link, category.gender, category.name));
    browser.close()
