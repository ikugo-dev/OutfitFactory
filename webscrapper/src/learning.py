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
    browser = webdriver.Firefox()
    browser.get("https://www.sinsay.com/rs/sr/zene/odeca/majice/majice")
    time.sleep(2)
    soup = BeautifulSoup(browser.page_source, "lxml")
    all_products = soup.select('article[class="sc-iyjcfA kWVQpz es-product"]')
    for product in all_products:
        link = product.select_one('a')
        if link != None:
            print(link['href'])
    # print(parse_product(browser, SINSAY_SITE_3, "sorc"))
    browser.close()


# <article class="sc-iyjcfA kWVQpz es-product" data-sku="8781J-01X" data-id="4305059" data-version="1" data-position="19">
# <figure>
# <div class="sc-cKFTQB dnhOaf sc-kehEZA elcWtt">
# <div data-testid="heart" class="sc-zzebL bXcHNX">
# <div class="sc-hScDBe eDOxtd">
# </div>
# </div>
# </div>
# <a class="sc-fZnosR ecbimD es-product-photo" href="https://www.sinsay.com/rs/sr/kratka-majica-s-vezom-8781j-01x">
# <img src="https://static.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/8/7/8781J-01X-001-1-940949.jpg" data-front="https://static.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/8/7/8781J-01X-001-1-940949.jpg" data-back="https://static.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/8/7/8781J-01X-002-1-927342.jpg" alt="Kratka majica s vezom - krem - SINSAY" width="200" height="250" class="sc-cRnZOa eqZste">
# </a>
# <figcaption class="sc-eQhwiw ejVNng">
# <div class="sc-UwENZ NVAVn">
# <ul class="color-picker rounded-image-border">
# <li class="active">
# <button value="8781J-01X">
# <img src="https://static.sinsay.com/media/catalog/product/cache/40/a4e40ebdc3e371adff845072e1c73f37/8/7/8781J-01X-999-1-927342.jpg" title="krem" alt="Kratka majica s vezom - krem">
# </button>
# </li>
# </ul>
# </div>
# <div class="sc-bHXGc eYVwfr">
# <h3 class="sc-cnXfEn hJaKmb es-product-name">
# <a href="https://www.sinsay.com/rs/sr/kratka-majica-s-vezom-8781j-01x">Kratka majica s vezom
# </a>
# </h3>
# </div>
# <div class="sc-dOFSHK hZPHXR">
# <section class="sc-gmAFnh evtcFQ es-product-price">
# <p class="es-final-price">
# <span>449&nbsp;RSD
# </span>
# </p>
# </section>
# </div>
# <div class="sc-hFNyqu hYDyOs">
# <button class="qs-action-icon__container" part="qs-action-icon-button" data-testid="quick-shop">
# <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
# <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4201 3.99902C10.6066 3.99902 9.94722 4.65845 9.94722 5.47189V6.21191H12.8929V5.47189C12.8929 4.65845 12.2335 3.99902 11.4201 3.99902ZM7.94722 9.73565V8.21191H5.85318L5.08317 18.001H12V20.001H4.00143H2.91968L3.00451 18.9226L3.93183 7.1335L4.00432 6.21191H4.92875H7.94722V5.47189C7.94722 3.55388 9.50207 1.99902 11.4201 1.99902C13.3381 1.99902 14.8929 3.55388 14.8929 5.47189V6.21191H17.9113H18.8357L18.9082 7.1335L19.3697 13H17.3635L16.9869 8.21191H14.8929V9.73565H12.8929V8.21191H9.94722V9.73565H7.94722Z" fill="#16181D">
# </path>
# <path d="M18.4199 22L18.4199 16" stroke="#16181D" stroke-width="1.5">
# </path>
# <path d="M15.4199 19L21.4199 19" stroke="#16181D" stroke-width="1.5">
# </path>
# </svg>
# </button>
# </div>
# </figcaption>
# </figure>
# </article>
