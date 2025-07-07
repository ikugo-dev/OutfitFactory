from bs4 import BeautifulSoup
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
    SINSAY_SITE_1 = "https://www.sinsay.com/rs/sr/dzemper-479ca-01x"
    SINSAY_SITE_2 = "https://www.sinsay.com/rs/sr/majica-kratkih-rukava-s-printom-8782j-00x"
    SINSAY_SITE_3 = "https://www.sinsay.com/rs/sr/biciklisticki-sortsevi-106ac-99x"
    browser = webdriver.Firefox()
    print(parse_product(browser, SINSAY_SITE_1, "dzemper"))
    print(parse_product(browser, SINSAY_SITE_2, "majca"))
    print(parse_product(browser, SINSAY_SITE_3, "sorc"))
    browser.close()
