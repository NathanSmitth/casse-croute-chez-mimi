"""
PLACEHOLDER image generator — run with `npm run placeholders`.

Creates labelled, correctly-sized stand-ins so the layout is production-shaped
before real photos arrive. Replace each file in public/images/ with a real photo
of the SAME filename and aspect ratio (no code changes needed):

  public/images/exterior.jpg           2000×1333  (3:2)  hero — building exterior
  public/images/dishes/<id>.jpg         900×1125  (4:5)  signature dishes marquee
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "public" / "images"
FONT = "/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf"

FOREST = (31, 90, 46)
SAGE = (168, 203, 110)
CHARCOAL = (58, 61, 64)
PAPER = (250, 248, 243)
PAPER_DARK = (239, 234, 224)

DISHES = [
    ("poutine-classique", "Poutine classique"),
    ("poutine-italienne", "Poutine italienne"),
    ("guedille-homard", "Guédille au homard"),
    ("dejeuner-classique", "Déjeuner classique"),
    ("frites-maison", "Frites maison"),
    ("menu-du-jour", "Menu du jour"),
]


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT, size)


def centered(draw: ImageDraw.ImageDraw, y: int, text: str, f, fill, width: int):
    w = draw.textlength(text, font=f)
    draw.text(((width - w) / 2, y), text, font=f, fill=fill)


def dish(slug: str, label: str):
    w, h = 900, 1125
    img = Image.new("RGB", (w, h), PAPER_DARK)
    d = ImageDraw.Draw(img)
    # Plate: soft shadow, rim, well
    shadow = Image.new("L", (w, h), 0)
    ImageDraw.Draw(shadow).ellipse((150, 260, 770, 880), fill=70)
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    img.paste((205, 198, 184), (0, 0), shadow)
    d.ellipse((140, 230, 760, 850), fill=(255, 254, 250), outline=(226, 220, 208), width=4)
    d.ellipse((230, 320, 670, 760), outline=(234, 229, 218), width=3)
    # Green-check napkin corner — nod to the brand
    for i in range(0, 260, 40):
        for j in range(0, 260, 40):
            if (i // 40 + j // 40) % 2 == 0:
                d.rectangle((w - 260 + i, h - 260 + j, w - 220 + i, h - 220 + j), fill=(*SAGE,))
    centered(d, 920, label, font(52), CHARCOAL, w)
    centered(d, 995, "PLACEHOLDER - PHOTO A VENIR", font(24), FOREST, w)
    out = IMAGES / "dishes" / f"{slug}.jpg"
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "JPEG", quality=82, optimize=True, progressive=True)


def exterior():
    w, h = 2000, 1333
    img = Image.new("RGB", (w, h), (120, 150, 170))
    d = ImageDraw.Draw(img)
    # Sky gradient
    for y in range(h):
        t = y / h
        d.line([(0, y), (w, y)], fill=(int(150 - 60 * t), int(178 - 60 * t), int(196 - 50 * t)))
    # Ground + building silhouette (charcoal cladding like the real façade)
    d.rectangle((0, 1030, w, h), fill=(70, 74, 70))
    d.rectangle((360, 520, 1640, 1040), fill=CHARCOAL)
    d.polygon([(320, 540), (1000, 330), (1680, 540)], fill=(46, 48, 51))
    d.rectangle((360, 600, 1640, 680), fill=FOREST)  # sign band
    for x in (470, 800, 1260):  # windows
        d.rectangle((x, 760, x + 260, 940), fill=(222, 196, 140))
    d.rectangle((1080, 760, 1200, 1040), fill=(34, 36, 38))  # door
    centered(d, 1240, "PLACEHOLDER - PHOTO DE LA FACADE A VENIR", font(40), PAPER, w)
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    img.save(IMAGES / "exterior.jpg", "JPEG", quality=80, optimize=True, progressive=True)


if __name__ == "__main__":
    IMAGES.mkdir(parents=True, exist_ok=True)
    exterior()
    for slug, label in DISHES:
        dish(slug, label)
    print("Placeholders written to", IMAGES)
