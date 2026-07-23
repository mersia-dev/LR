from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

PRODUCTS = [
    {
        "id": 1,
        "title": "Air Fryer Digital Stainless Steel 5L",
        "category": "Cozinha",
        "old_price": 499.90,
        "new_price": 289.90,
        "discount": "42%",
        "rating": 4.9,
        "reviews": 1280,
        "badge": "Mais Vendido",
        "image_color": "#e74c3c",
        "affiliate_url": "https://shopee.com.br",
        "coupon_code": "PANELA10"
    },
    {
        "id": 2,
        "title": "Jogo de Panelas Cerâmica Premium 5 Peças",
        "category": "Utilidades",
        "old_price": 350.00,
        "new_price": 199.00,
        "discount": "43%",
        "rating": 4.8,
        "reviews": 850,
        "badge": "Nota 4.8+",
        "image_color": "#27ae60",
        "affiliate_url": "https://shopee.com.br",
        "coupon_code": "PROMO30"
    },
    {
        "id": 3,
        "title": "MOP Giratório Lava e Seca Inteligente",
        "category": "Limpeza",
        "old_price": 120.00,
        "new_price": 69.90,
        "discount": "41%",
        "rating": 4.9,
        "reviews": 2100,
        "badge": "Oferta Relâmpago",
        "image_color": "#2980b9",
        "affiliate_url": "https://shopee.com.br",
        "coupon_code": "LIMPA15"
    },
    {
        "id": 4,
        "title": "Robô Aspirador de Pó Inteligente Wi-Fi",
        "category": "Eletrônicos",
        "old_price": 899.00,
        "new_price": 499.00,
        "discount": "44%",
        "rating": 4.8,
        "reviews": 640,
        "badge": "Testado & Aprovado",
        "image_color": "#8e44ad",
        "affiliate_url": "https://shopee.com.br",
        "coupon_code": "ROBO50"
    }
]

LEADS = []

@app.route('/')
def index():
    return render_template('index.html', products=PRODUCTS)

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify({"status": "success", "data": PRODUCTS})

@app.route('/api/lead', methods=['POST'])
def capture_lead():
    data = request.json
    email_or_phone = data.get('contact')
    if not email_or_phone:
        return jsonify({"status": "error", "message": "Contato inválido"}), 400
    
    LEADS.append(email_or_phone)
    return jsonify({
        "status": "success", 
        "message": "Lead cadastrado com sucesso! Redirecionando para o VIP...",
        "redirect_url": "https://t.me/seugrupodecupons"
    })

# Required for Vercel
if __name__ == '__main__':
    app.run()
