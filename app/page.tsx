"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Dish = {
  name: string;
  category: "Entrées" | "Plats" | "Desserts";
  description: string;
  ingredients: string;
  price: string;
  image: string;
  vegan?: boolean;
};

const menuItems: Dish[] = [
  { name: "Salade croquante", category: "Entrées", description: "Jeunes pousses, légumes frais et vinaigrette citronnée.", ingredients: "Roquette, concombre, radis, pomme verte, graines et citron.", price: "8,50 €", image: "/images/asset4.jpeg", vegan: true },
  { name: "Velouté du jardin", category: "Entrées", description: "Une soupe douce et réconfortante selon le marché.", ingredients: "Courgette, petits pois, poireau, menthe et huile d'olive.", price: "7,50 €", image: "/images/asset9.jpeg", vegan: true },
  { name: "Tartine méditerranéenne", category: "Entrées", description: "Pain grillé, légumes confits et crème aux herbes.", ingredients: "Pain au levain, aubergine, tomate, basilic et houmous.", price: "8,90 €", image: "/images/asset4.jpeg", vegan: true },
  { name: "Pizza du potager", category: "Plats", description: "Une pâte fine cuite au feu de bois, garnie de saison.", ingredients: "Tomate, poivron rôti, champignons, olives, basilic et fromage végétal.", price: "14,50 €", image: "/images/asset10.jpeg", vegan: true },
  { name: "Biryani Capharnaüm", category: "Plats", description: "Un riz basmati parfumé aux épices douces.", ingredients: "Riz basmati, carotte, chou-fleur, petits pois, cajou et safran.", price: "13,50 €", image: "/images/asset9.jpeg", vegan: true },
  { name: "Burger végétal", category: "Plats", description: "Notre généreux burger maison au steak de légumes fumé.", ingredients: "Pain au sésame, galette de lentilles, laitue, tomate et sauce.", price: "12,50 €", image: "/images/asset13.jpeg", vegan: true },
  { name: "Curry coco", category: "Plats", description: "Légumes fondants dans une sauce coco légèrement épicée.", ingredients: "Patate douce, pois chiches, épinards, lait de coco et riz.", price: "13,90 €", image: "/images/asset9.jpeg", vegan: true },
  { name: "Sandwich aux herbes", category: "Plats", description: "Un sandwich frais et croquant à la crème d'herbes.", ingredients: "Pain au levain, concombre, tomate, laitue, basilic et crème.", price: "9,50 €", image: "/images/asset4.jpeg", vegan: true },
  { name: "Lasagnes de légumes", category: "Plats", description: "Des lasagnes généreuses, gratinées et pleines de soleil.", ingredients: "Pâte fraîche, courgette, aubergine, tomate et béchamel.", price: "14,90 €", image: "/images/asset10.jpeg", vegan: false },
  { name: "Risotto aux champignons", category: "Plats", description: "Un risotto crémeux aux champignons de Paris.", ingredients: "Riz arborio, champignons, échalote, parmesan et persil.", price: "15,50 €", image: "/images/asset9.jpeg", vegan: false },
  { name: "Tarte fine aux pommes", category: "Desserts", description: "Une tarte fine, fondante et délicatement caramélisée.", ingredients: "Pomme, pâte feuilletée, cannelle et sucre roux.", price: "6,50 €", image: "/images/asset4.jpeg", vegan: true },
  { name: "Moelleux chocolat", category: "Desserts", description: "Un cœur chocolaté servi tiède.", ingredients: "Chocolat noir, farine, cacao, sucre et huile de coco.", price: "7,00 €", image: "/images/asset13.jpeg", vegan: true },
  { name: "Panna cotta vanille", category: "Desserts", description: "Une crème légère accompagnée de fruits rouges.", ingredients: "Vanille, crème, agar-agar, framboise et cassis.", price: "6,90 €", image: "/images/asset4.jpeg", vegan: false },
  { name: "Cheesecake citron", category: "Desserts", description: "Une part fraîche et acidulée sur biscuit croustillant.", ingredients: "Citron, fromage frais, biscuit, sucre et zestes.", price: "7,50 €", image: "/images/asset10.jpeg", vegan: false },
  { name: "Granola fruits frais", category: "Desserts", description: "Un dessert léger, croquant et naturellement gourmand.", ingredients: "Avoine, amande, yaourt végétal, fruits et sirop d'érable.", price: "6,50 €", image: "/images/asset9.jpeg", vegan: true },
];

const menuDuJour: Dish[] = [
  { name: "Salade de lentilles", category: "Entrées", description: "Lentilles vertes, carottes rôties et feta.", ingredients: "Lentilles, carotte, feta, persil et vinaigrette moutarde.", price: "Formule 16,90 €", image: "/images/asset4.jpeg" },
  { name: "Gaspacho tomate", category: "Entrées", description: "Un gaspacho frais aux légumes mûris au soleil.", ingredients: "Tomate, poivron, concombre, huile d'olive et basilic.", price: "Formule 16,90 €", image: "/images/asset9.jpeg", vegan: true },
  { name: "Pizza du midi", category: "Plats", description: "La garniture du marché sur notre pâte maison.", ingredients: "Tomate, légumes du marché, mozzarella et basilic.", price: "Formule 16,90 €", image: "/images/asset10.jpeg" },
  { name: "Dahl de pois chiches", category: "Plats", description: "Un dahl doux servi avec riz basmati parfumé.", ingredients: "Pois chiches, lentilles corail, épices, coco et riz.", price: "Formule 16,90 €", image: "/images/asset9.jpeg", vegan: true },
  { name: "Bowl du marché", category: "Plats", description: "Céréales, légumes rôtis et sauce tahini maison.", ingredients: "Quinoa, courge, brocoli, pois chiches et tahini.", price: "Formule 16,90 €", image: "/images/asset4.jpeg", vegan: true },
  { name: "Dessert du jour", category: "Desserts", description: "La douceur imaginée par notre pâtissier.", ingredients: "Demandez la composition à notre équipe.", price: "Inclus dans la formule", image: "/images/asset13.jpeg" },
];

function DishCard({ dish, id, openId, setOpenId }: { dish: Dish; id: string; openId: string | null; setOpenId: (id: string | null) => void }) {
  const isOpen = openId === id;
  return (
    <article className="menu-item">
      <img src={dish.image} alt="" />
      <div className="menu-item-content">
        <div className="menu-item-title">
          <h3>{dish.name}</h3>
          {dish.vegan && <img className="vegan-badge" src="/images/veg.png" alt="Végane" />}
        </div>
        <p>{dish.description}</p>
        <div className="menu-item-footer">
          <strong>{dish.price}</strong>
          <button type="button" onClick={() => setOpenId(isOpen ? null : id)} aria-expanded={isOpen} aria-controls={`ingredients-${id}`}>
            {isOpen ? "Masquer" : "Ingrédients"} {isOpen ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
          </button>
        </div>
        {isOpen && <p className="ingredients" id={`ingredients-${id}`}>{dish.ingredients}</p>}
      </div>
    </article>
  );
}

export default function Home() {
  const [openId, setOpenId] = useState<string | null>(null);
  const restaurantOpen = true;

  return (
    <main className="restaurant-page">
      <section className="hero-shell" id="home">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <header className="site-header">
          <nav className="primary-nav" aria-label="Navigation principale">
            <a href="#services">Nos services</a>
            <a href="#menu">Menu</a>
            <a href="#menu-du-jour">Menu du jour</a>
          </nav>
          <a className="brand" href="#home" aria-label="Le Capharnaüm accueil"><span>Le Capharnaüm</span></a>
        </header>
        <section className="hero-content">
          <p className="eyebrow">Cuisine végétale · Paris</p>
          <h1>Healthy Veg<br />Outlet</h1>
          <div className="restaurant-details" id="services">
            <span><strong>17 Rue du Faubourg</strong><small>75010 Paris</small></span>
            <span><strong>+33 1 42 00 00 00</strong><small>Réserver une table</small></span>
            <span><strong>11:30 — 22:30</strong><small className={restaurantOpen ? "status-tag is-open" : "status-tag is-closed"}>{restaurantOpen ? "Ouvert aujourd'hui" : "Fermé aujourd'hui"}</small></span>
          </div>
        </section>
        <div className="slide-dots" aria-hidden="true"><span className="active" /><span /><span /></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading"><p className="eyebrow">Le goût du fait maison</p><h2>Notre menu</h2><p>Des assiettes végétales, généreuses et colorées, préparées à Paris.</p></div>
        <div className="menu-category-grid">
          {(["Entrées", "Plats", "Desserts"] as const).map((category) => (
            <section className="menu-category" key={category}>
              <h3>{category}</h3>
              <div className="menu-grid">{menuItems.filter((item) => item.category === category).map((item, index) => <DishCard key={item.name} dish={item} id={`menu-${category}-${index}`} openId={openId} setOpenId={setOpenId} />)}</div>
            </section>
          ))}
        </div>
      </section>

      <section className="menu-section menu-day-section" id="menu-du-jour">
        <div className="section-heading"><p className="eyebrow">Chaque midi</p><h2>Menu du jour</h2><p>Une sélection qui change au fil des arrivages et de nos envies.</p></div>
        <div className="menu-grid menu-day-grid">{menuDuJour.map((item, index) => <DishCard key={item.name} dish={item} id={`jour-${index}`} openId={openId} setOpenId={setOpenId} />)}</div>
      </section>
      <footer className="site-footer" id="contact"><strong>Le Capharnaüm</strong><span>17 Rue du Faubourg, 75010 Paris</span><span>+33 1 42 00 00 00</span></footer>
    </main>
  );
}
