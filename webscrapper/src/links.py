from collections import namedtuple

Category = namedtuple('Category', 'link gender name')
categories = [
    Category("https://www.sinsay.com/rs/sr/muskarac/odeca/basic/basic-majice",       "m",  "majice"),
    Category("https://www.sinsay.com/rs/sr/muskarac/odeca/basic/basic-pantalone",    "m",  "pantalone"),
    Category("https://www.sinsay.com/rs/sr/muskarac/odeca/basic/basic-farmerke",     "m",  "farmerke"),
    Category("https://www.sinsay.com/rs/sr/muskarac/odeca/basic/basic-dukserice",    "m",  "dukserice"),
    Category("https://www.sinsay.com/rs/sr/muskarac/m-basic/m-basic-shorts",         "m",  "šorc"),
    Category("https://www.sinsay.com/rs/sr/muskarac/odeca/basic/basic-jakne",        "m",  "jakne"),
    Category("https://www.sinsay.com/rs/sr/muskarac/odeca/basic/basic-dzemperi",     "m",  "dzemperi"),
    Category("https://www.sinsay.com/rs/sr/muskarac/cipele-i-dodaci/cipele",         "m",  "cipele"),
    Category("https://www.sinsay.com/rs/sr/muskarac/cipele-i-dodaci/kacketi",        "m",  "kacketi"),
    Category("https://www.sinsay.com/rs/sr/muskarac/cipele-i-dodaci/m-wallets",      "m",  "novcanici"),
    Category("https://www.sinsay.com/rs/sr/muskarac/cipele-i-dodaci/rukavice",       "m",  "rukavice"),
    Category("https://www.sinsay.com/rs/sr/muskarac/cipele-i-dodaci/salovi",         "m",  "salovi"),

    Category("https://www.sinsay.com/rs/sr/zene/line/basic/basic-majice",            "z",  "majice"),
    Category("https://www.sinsay.com/rs/sr/zene/line/basic/basic-pantalone",         "z",  "pantalone"),
    Category("https://www.sinsay.com/rs/sr/zene/line/basic/basic-farmerke",          "z",  "farmerke"),
    Category("https://www.sinsay.com/rs/sr/zene/line/basic/basic-dukserice",         "z",  "dukserice"),
    Category("https://www.sinsay.com/rs/sr/zene/line/basic/basic-haljine-i-suknje",  "z",  "haljine-i-suknje"),
    Category("https://www.sinsay.com/rs/sr/zene/line/basic/basic-shirts",            "z",  "košulje"),
    Category("https://www.sinsay.com/rs/sr/zene/cipele-i-dodaci/cipele",             "z",  "cipele"),
    Category("https://www.sinsay.com/rs/sr/zene/cipele-i-dodaci/naocare",            "z",  "naocare"),
    Category("https://www.sinsay.com/rs/sr/zene/cipele-i-dodaci/sesiri",             "z",  "sesiri"),
    Category("https://www.sinsay.com/rs/sr/zene/cipele-i-dodaci/kacketi",            "z",  "kacketi"),
    Category("https://www.sinsay.com/rs/sr/zene/cipele-i-dodaci/salovi-i-marame",    "z",  "salovi"),
    Category("https://www.sinsay.com/rs/sr/zene/cipele-i-dodaci/novcanici",          "z",  "novcanici"),
    Category("https://www.sinsay.com/rs/sr/zene/odeca/sakoi",                        "z",  "jakne"),
]
