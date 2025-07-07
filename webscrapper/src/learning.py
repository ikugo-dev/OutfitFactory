from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium import webdriver
import time

def parse_product(browser: WebDriver, url: str, category: str):
    browser.get(url)
    time.sleep(2)
    soup = BeautifulSoup(browser.page_source, "lxml")

    def safe_select(selector):
        tag = soup.select_one(selector)
        if (tag is None):
            return "N/A"
        else:
            return tag.text.strip()

    id_value = url[29:] # da izbrisemo "https://www.sinsay.com/rs/sr/"
    name_value   =  safe_select("h1[data-testid='product-name']")
    price_value  =  safe_select("div[data-selen='product-price']").replace('\xa0', ' ') # zbog whitespaces koji stavljaju
    color_value  =  safe_select("span[data-testid='color-picker-color-name']")

    return {
        "id": id_value,
        "brand": "Sinsay",
        "category": category,
        "name":  name_value,
        "price": price_value,
        "color": color_value,
    }

def load_category_page(browser: WebDriver):
    while True:
        try:
            load_more_link = browser.find_element(By.XPATH, "//a[text()='Više proizvoda']")
            current_count = len(browser.find_elements(By.CSS_SELECTOR, 'article.sc-iyjcfA.kWVQpz.es-product'))
            load_more_link.click()

            WebDriverWait(browser, 10).until(
                lambda browser: len(browser.find_elements(By.CSS_SELECTOR, 'article.sc-iyjcfA.kWVQpz.es-product')) > current_count
            )
        except:
            break

def extract_category_product_links(browser: WebDriver):
    load_category_page(browser)

    soup = BeautifulSoup(browser.page_source, "lxml")
    links = []
    for product in soup.select('article[class="sc-iyjcfA kWVQpz es-product"]'):
        link = product.select_one('a')
        if link != None:
            links.append((link['href']))
    return links

if __name__ == "__main__":
    browser = webdriver.Firefox()
    browser.get("https://www.sinsay.com/rs/sr/zene/odeca/majice/majice")
    time.sleep(5)

    product_links = extract_category_product_links(browser)
    for product_link in product_links:
        print(product_link)

    browser.close()
