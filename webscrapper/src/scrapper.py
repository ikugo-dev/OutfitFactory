import sqlite3
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup

# Setup headless browser
options = webdriver.ChromeOptions()
options.add_argument("--headless=new")
driver = webdriver.Chrome(options=options)

BASE_URL = "https://www.sinsay.com/rs/sr"
CATEGORY_BASE = "https://www.sinsay.com/rs/sr/ona/odeca"

# SQLite DB setup
conn = sqlite3.connect("sinsay_clothes.db")
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS clothes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    price TEXT,
    color TEXT,
    material TEXT,
    url TEXT UNIQUE
)
""")
conn.commit()


def get_categories():
    print("Fetching categories...")
    driver.get(CATEGORY_BASE)
    time.sleep(3)
    soup = BeautifulSoup(driver.page_source, "html.parser")
    links = soup.select('a.category-tile')

    category_urls = {}
    for link in links:
        name = link.text.strip().lower()
        url = link.get("href")
        if url and "/ona/odeca/" in url:
            category_urls[name] = BASE_URL + url

    return category_urls


def get_product_links(category_url):
    print(f"Getting product links from: {category_url}")
    product_links = set()
    driver.get(category_url)
    time.sleep(3)

    while True:
        soup = BeautifulSoup(driver.page_source, "html.parser")
        items = soup.select('a.product-tile-inner')

        for item in items:
            href = item.get("href")
            if href:
                product_links.add(BASE_URL + href)

        # Check for "next" page button
        try:
            next_button = driver.find_element(By.CSS_SELECTOR, "a.next")
            if "disabled" in next_button.get_attribute("class"):
                break
            next_button.click()
            time.sleep(2)
        except:
            break

    return list(product_links)


def parse_product(url, category):
    driver.get(url)
    time.sleep(2)
    soup = BeautifulSoup(driver.page_source, "html.parser")

    def safe_select(selector):
        el = soup.select_one(selector)
        return el.text.strip() if el else ""

    name = safe_select("h1.product-name")
    price = safe_select(".product-price-now")

    try:
        color = soup.find("span", string=lambda x: x and "Boja" in x).find_next("span").text.strip()
    except:
        color = ""

    try:
        material = soup.find("span", string=lambda x: x and "Sastav" in x).find_next("span").text.strip()
    except:
        material = ""

    return {
        "name": name,
        "category": category,
        "price": price,
        "color": color,
        "material": material,
        "url": url
    }


def save_to_db(item):
    cursor.execute("""
    INSERT OR IGNORE INTO clothes (name, category, price, color, material, url)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (
        item["name"],
        item["category"],
        item["price"],
        item["color"],
        item["material"],
        item["url"]
    ))
    conn.commit()


def main():
    categories = get_categories()

    for category_name, category_url in categories.items():
        print(f"\nScraping category: {category_name}")
        product_links = get_product_links(category_url)

        for url in product_links:
            print(f"  Parsing: {url}")
            try:
                data = parse_product(url, category_name)
                save_to_db(data)
            except Exception as e:
                print(f"  Failed to parse {url}: {e}")


if __name__ == "__main__":
    try:
        main()
    finally:
        driver.quit()
        conn.close()
