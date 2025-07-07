from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium import webdriver
import time

def parse_product(browser, url, category):
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

if __name__ == "__main__":
    browser = webdriver.Firefox()
    browser.get("https://www.sinsay.com/rs/sr/zene/odeca/majice/majice")
    time.sleep(5)

    while True:
        try:
            # <a href="https://www.sinsay.com/rs/sr/zene/odeca/majice/majice?page=6" class="sc-fYdeDz hNSbvz">Više proizvoda</a>
            load_more_link = browser.find_element(By.XPATH, "//a[text()='Više proizvoda']")
            load_more_link.click()
            time.sleep(5)
        except:
            break


    soup = BeautifulSoup(browser.page_source, "lxml")
    all_products = soup.select('article[class="sc-iyjcfA kWVQpz es-product"]')
    for product in all_products:
        link = product.select_one('a')
        if link != None:
            print(link['href'])
    # print(parse_product(browser, SINSAY_SITE_3, "sorc"))
    browser.close()


