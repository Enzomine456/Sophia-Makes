import React from "react";
import { Facebook, Instagram, MessageCircle, Heart, Sparkles, MapPin, Clock, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const whatsappNumber = "558596485522";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de saber mais sobre os produtos da Sophia Makes`;

  const footerSections = [
    {
      title: "Links Rápidos",
      links: [
        { label: "Início", path: "/" },
        { label: "Produtos", path: "/search" },
        { label: "Carrinho", path: "/cart" },
        { label: "Minha Conta", path: "/profile" }
      ]
    },
    {
      title: "Categorias",
      links: [
        { label: "Base e Corretivos", path: "/search" },
        { label: "Sombras e Delineadores", path: "/search" },
        { label: "Batons e Gloss", path: "/search" },
        { label: "Blush e Contorno", path: "/search" }
      ]
    }
  ];

  const benefits = [
    {
      icon: <Heart size={20} className="text-pink-500" />,
      title: "Produtos de Qualidade",
      description: "Selecionamos apenas as melhores marcas"
    },
    {
      icon: <MessageCircle size={20} className="text-green-500" />,
      title: "Atendimento Personalizado",
      description: "Tire suas dúvidas diretamente no WhatsApp"
    },
    {
      icon: <MapPin size={20} className="text-blue-500" />,
      title: "Entrega Flexível",
      description: "Combinamos a melhor forma de entrega"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-pink-50 via-white to-rose-50 border-t border-pink-100 mt-auto">
      {/* Benefits Section */}
      <div className="border-b border-pink-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center group cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-pink-600">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-gray-700">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2 animate-fadeInLeft">
              <div className="flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 liquid-glass-button rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Sparkles size={20} className="text-pink-600" />
                </div>
                <div className="text-2xl font-bold text-liquid-glass text-pink-700">
                  Sophia Makes
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sua loja online de maquiagens com os melhores produtos e atendimento personalizado. 
                Beleza e qualidade em cada produto!
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  title="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  title="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="animate-fadeInUp" style={{ animationDelay: `${(sectionIndex + 1) * 200}ms` }}>
                <h3 className="font-semibold text-gray-800 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.path} 
                        className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gradient-to-r from-pink-100 to-rose-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 animate-fadeInLeft">
              <MessageCircle className="text-green-500" size={20} />
              <div>
                <p className="font-semibold text-gray-800">(85) 9 6485-522</p>
                <p className="text-sm text-gray-600">WhatsApp</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-3 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <Clock className="text-blue-500" size={20} />
              <div>
                <p className="font-semibold text-gray-800">Segunda a Sábado</p>
                <p className="text-sm text-gray-600">9h às 18h</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-3 animate-fadeInRight" style={{ animationDelay: '400ms' }}>
              <CreditCard className="text-purple-500" size={20} />
              <div>
                <p className="font-semibold text-gray-800">Pagamento Flexível</p>
                <p className="text-sm text-gray-600">A combinar via WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-pink-200 py-6">
        <div className="container mx-auto px-4 text-center animate-fadeInUp">
          <p className="text-gray-600 text-sm">
            © 2024 Sophia Makes. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
            Desenvolvido com <Heart size={12} className="text-pink-500 animate-pulse" /> para você
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;