import qrcode
from PIL import Image

def generate_website_qr_code(url, file_path):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(file_path)

website_url = "https://www.freecodecamp.org/learn/data-analysis-with-python/"
file_path = "dataanalysis.png"

generate_website_qr_code(website_url, file_path)
