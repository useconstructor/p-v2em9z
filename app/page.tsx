'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Menu,
  X,
  ShoppingBag,
  Star,
  Zap,
  CheckCircle,
  Shirt,
  Package,
  Footprints,
  ArrowRight,
  Instagram,
  Twitter,
  Mail,
  Heart,
} from 'lucide-react'

const navLinks = [
  { label: 'Productos', href: '#productos' },
  { label: 'Colecciones', href: '#colecciones' },
  { label: 'Membresías', href: '#membresias' },
  { label: 'Nosotros', href: '#testimonios' },
]

const products = [
  { name: 'Oversize Shirts', price: '$54.99', colorways: 4, icon: Shirt, hasImage: true, imageSrc: '/images/product-1.png' },
  { name: 'Buzos', price: '$79.99', colorways: 3, icon: Package, hasImage: true, imageSrc: '/images/product-3.png' },
  { name: 'Cargo Pants', price: '$69.99', colorways: 2, icon: Package, hasImage: false },
  { name: 'Crew Socks', price: '$14.99', colorways: 5, icon: Footprints, hasImage: false },
  { name: 'High Top Tennis', price: '$129.99', colorways: 2, icon: Footprints, hasImage: false },
  { name: 'Graphic Tees', price: '$44.99', colorways: 6, icon: Shirt, hasImage: false },
]

const bundles = [
  { name: 'The Starter Kit', description: 'Oversize shirt + crew socks', price: '$64.99', tag: 'Popular' },
  { name: 'Street Ready', description: 'Oversize shirt + cargo pants + tennis', price: '$189.99', tag: 'Best Value' },
  { name: 'Full Flex', description: 'Complete outfit, all 6 categories', price: '$349.99', tag: 'Ultimate' },
]

const tiers = [
  {
    name: 'Street',
    price: '$39',
    period: '/mes',
    features: ['5 drops exclusivos al año', 'Envío gratis en pedidos +$75', 'Acceso a Discord members'],
    highlight: false,
  },
  {
    name: 'Collector',
    price: '$79',
    period: '/mes',
    features: ['Early access 48h antes', 'Envío gratis siempre', 'Colorways exclusivos', 'Gift box trimestral'],
    highlight: true,
  },
  {
    name: 'OG',
    price: '$199',
    period: '/mes',
    features: ['Checkout VIP prioritario', 'Consulta de styling personal', 'Early access de por vida', 'Items exclusivos trimestrales', '20% crédito en tienda'],
    highlight: false,
  },
]

const testimonials = [
  { quote: 'The oversized fit is immaculate. Quality hits different.', name: 'Marcus T.', role: '@streetwear_collector', initials: 'MT', rating: 5 },
  { quote: 'Finally found black and red basics that don\'t fall apart after 10 washes.', name: 'Sophia R.', role: 'Fashion Student', initials: 'SR', rating: 5 },
  { quote: 'La Calle is what streetwear should be.', name: 'Diego L.', role: 'Artist', initials: 'DL', rating: 5 },
  { quote: 'Shipping was fast, packaging was clean, fits perfectly.', name: 'Jasmine K.', role: 'Content Creator', initials: 'JK', rating: 4 },
]

const stats = [
  { value: '47,000+', label: 'Units Sold', icon: ShoppingBag },
  { value: '98%', label: 'Customer Satisfaction', icon: Star },
  { value: '2-3 días', label: 'Envío Express', icon: Zap },
  { value: '100%', label: 'Ethical Production', icon: CheckCircle },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setNewsletterStatus('loading')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newsletterEmail, type: 'newsletter' }),
        }
      )

      if (res.ok) {
        setNewsletterStatus('success')
        setNewsletterEmail('')
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      {/* Nav Sticky */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="font-[family-name:var(--font-montserrat)] font-bold text-2xl tracking-tight">
              LA CALLE
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-[#C41E3A] hover:bg-transparent"
                onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ShoppingBag className="w-5 h-5" />
              </Button>
              <Button
                className="bg-[#C41E3A] hover:bg-[#a01830] text-white"
                onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Now
              </Button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 bg-[#1A1A1A] border-t border-[#808080]/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-lg font-medium text-gray-300 hover:text-white transition-all duration-300"
                style={{ transitionDelay: mobileMenuOpen ? `${index * 60}ms` : '0ms' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="w-full mt-4 bg-[#C41E3A] hover:bg-[#a01830] text-white"
              onClick={() => {
                setMobileMenuOpen(false)
                document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Shop Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Split */}
      <section className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-[#F5F5F5] to-[#e8e8e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-[#C41E3A]/10 text-[#C41E3A] border-[#C41E3A]/20 hover:bg-[#C41E3A]/20">
                New Collection 2024
              </Badge>
              <h1 className="font-[family-name:var(--font-montserrat)] font-bold text-5xl sm:text-6xl lg:text-7xl text-[#1A1A1A] leading-tight">
                Own the Streets
              </h1>
              <p className="text-lg sm:text-xl text-[#808080] max-w-lg">
                Premium oversized basics in black and red. Built for urban rebels who demand quality and authentic street culture aesthetic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#C41E3A] hover:bg-[#a01830] text-white text-lg px-8 h-14 rounded-lg shadow-lg shadow-[#C41E3A]/25"
                  onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#C41E3A] text-[#C41E3A] hover:bg-[#C41E3A]/10 text-lg px-8 h-14 rounded-lg"
                  onClick={() => document.getElementById('colecciones')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Lookbook
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero.png"
                  alt="La Calle streetwear model wearing oversized black and red apparel"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#1A1A1A] text-white px-6 py-4 rounded-xl shadow-xl">
                <p className="text-sm text-[#808080]">Starting at</p>
                <p className="font-[family-name:var(--font-montserrat)] font-bold text-2xl">$14.99</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-[#1A1A1A] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="p-3 bg-[#C41E3A]/20 rounded-lg">
                  <stat.icon className="w-6 h-6 text-[#C41E3A]" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-montserrat)] font-bold text-xl sm:text-2xl text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-[#808080]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="productos" className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl sm:text-4xl text-[#1A1A1A] mb-4">
              Product Categories
            </h2>
            <p className="text-[#808080] text-lg max-w-2xl mx-auto">
              Premium oversized basics crafted for those who own the streets
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.name}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="relative aspect-square overflow-hidden">
                  {product.hasImage ? (
                    <Image
                      src={product.imageSrc!}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#000000] flex items-center justify-center">
                      <product.icon className="w-24 h-24 text-[#C41E3A]/60" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-[#C41E3A] text-white border-0">
                      {product.colorways} colorways
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-lg text-[#1A1A1A]">
                    {product.name}
                  </h3>
                  <p className="text-[#C41E3A] font-bold text-xl mt-2">{product.price}</p>
                  <Button
                    className="w-full mt-4 bg-[#1A1A1A] hover:bg-[#000000] text-white"
                    onClick={() => document.getElementById('colecciones')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Collection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section id="colecciones" className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl sm:text-4xl text-white mb-4">
              The Essentials
            </h2>
            <p className="text-[#808080] text-lg max-w-2xl mx-auto">
              Curated bundles for every level of street style
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {bundles.map((bundle) => (
              <Card
                key={bundle.name}
                className="bg-gradient-to-br from-[#2a2a2a] to-[#1A1A1A] border-[#808080]/20 overflow-hidden group"
              >
                <CardContent className="p-8">
                  <Badge
                    className={`mb-4 ${
                      bundle.tag === 'Best Value'
                        ? 'bg-[#C41E3A] text-white border-0'
                        : 'bg-[#808080]/20 text-[#808080] border-[#808080]/40'
                    }`}
                  >
                    {bundle.tag}
                  </Badge>
                  <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-2xl text-white mb-2">
                    {bundle.name}
                  </h3>
                  <p className="text-[#808080] mb-6">{bundle.description}</p>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#000000] to-[#1A1A1A]">
                    <Image
                      src="/images/feature.png"
                      alt={bundle.name}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-[family-name:var(--font-montserrat)] font-bold text-3xl text-[#C41E3A]">
                      {bundle.price}
                    </p>
                    <Button
                      className="bg-[#C41E3A] hover:bg-[#a01830] text-white"
                      onClick={() => document.getElementById('membresias')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      View Bundle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="membresias" className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl sm:text-4xl text-[#1A1A1A] mb-4">
              Join the Movement
            </h2>
            <p className="text-[#808080] text-lg max-w-2xl mx-auto">
              Become a La Calle member and unlock exclusive drops, early access, and VIP perks
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative overflow-hidden transition-all duration-300 ${
                  tier.highlight
                    ? 'border-2 border-[#C41E3A] shadow-xl shadow-[#C41E3A]/10 scale-105'
                    : 'border-[#808080]/20 hover:border-[#808080]/40'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-0 right-0 bg-[#C41E3A] text-white text-center py-2 text-sm font-medium">
                    Recommended
                  </div>
                )}
                <CardContent className={`p-8 ${tier.highlight ? 'pt-14' : ''}`}>
                  <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-2xl text-[#1A1A1A] mb-2">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-[family-name:var(--font-montserrat)] font-bold text-4xl text-[#1A1A1A]">
                      {tier.price}
                    </span>
                    <span className="text-[#808080]">{tier.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#C41E3A] flex-shrink-0 mt-0.5" />
                        <span className="text-[#1A1A1A]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full h-12 ${
                      tier.highlight
                        ? 'bg-[#C41E3A] hover:bg-[#a01830] text-white'
                        : 'bg-[#1A1A1A] hover:bg-[#000000] text-white'
                    }`}
                    onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section id="testimonios" className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl sm:text-4xl text-white mb-4">
              What the Streets Say
            </h2>
            <p className="text-[#808080] text-lg max-w-2xl mx-auto">
              Real reviews from the La Calle community
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="bg-gradient-to-br from-[#2a2a2a] to-[#1A1A1A] border-[#808080]/20"
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'text-[#C41E3A] fill-[#C41E3A]' : 'text-[#808080]'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-white text-lg mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C41E3A] flex items-center justify-center text-white font-bold border-2 border-[#C41E3A]">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-medium text-white">{testimonial.name}</p>
                      <p className="text-sm text-[#808080]">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Strip */}
      <section id="newsletter" className="py-12 bg-[#C41E3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {newsletterStatus === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
              <p className="text-white text-xl font-medium">
                ✓ Mensaje enviado — te contactaremos pronto
              </p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-2xl sm:text-3xl text-white mb-2">
                  Get Early Drop Alerts
                </h2>
                <p className="text-white/80">
                  Be the first to know about new releases and exclusive deals
                </p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 min-w-[280px]"
                  required
                />
                <Button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="bg-[#1A1A1A] hover:bg-[#000000] text-white h-12 px-8"
                >
                  {newsletterStatus === 'loading' ? 'Enviando…' : 'Subscribe'}
                </Button>
              </form>
              {newsletterStatus === 'error' && (
                <p className="text-white text-sm">Error al enviar. Intenta de nuevo.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Full */}
      <section className="py-20 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C41E3A] rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C41E3A] rounded-full blur-[128px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Ready to Own the Streets?
          </h2>
          <p className="text-xl text-[#808080] mb-10 max-w-2xl mx-auto">
            Join thousands of urban rebels wearing La Calle. Premium quality, authentic street culture, delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#C41E3A] hover:bg-[#a01830] text-white text-lg px-10 h-14 rounded-lg shadow-lg shadow-[#C41E3A]/25"
              onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-10 h-14 rounded-lg"
              onClick={() => document.getElementById('membresias')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Become a Member
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Full */}
      <footer className="bg-[#1A1A1A] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#808080]/20">
            <div className="col-span-2 lg:col-span-1">
              <a href="#" className="font-[family-name:var(--font-montserrat)] font-bold text-2xl text-white tracking-tight">
                LA CALLE
              </a>
              <p className="text-[#808080] mt-4 text-sm">
                Premium oversized basics for urban rebels. Black and red, always.
              </p>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#808080]/20 rounded-full flex items-center justify-center text-[#808080] hover:text-[#C41E3A] hover:bg-[#C41E3A]/10 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#808080]/20 rounded-full flex items-center justify-center text-[#808080] hover:text-[#C41E3A] hover:bg-[#C41E3A]/10 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="mailto:hola@lacalle.com"
                  className="w-10 h-10 bg-[#808080]/20 rounded-full flex items-center justify-center text-[#808080] hover:text-[#C41E3A] hover:bg-[#C41E3A]/10 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-[family-name:var(--font-montserrat)] font-bold text-white mb-4">Shop</h4>
              <ul className="space-y-3">
                {['Oversize Shirts', 'Buzos', 'Cargo Pants', 'Tennis'].map((item) => (
                  <li key={item}>
                    <a
                      href="#productos"
                      className="text-[#808080] hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-[family-name:var(--font-montserrat)] font-bold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Lookbook', 'Size Guide', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={item === 'Contact' ? 'mailto:hola@lacalle.com' : '#testimonios'}
                      className="text-[#808080] hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-[family-name:var(--font-montserrat)] font-bold text-white mb-4">Support</h4>
              <ul className="space-y-3">
                {['Shipping Info', 'Returns', 'FAQ', 'Track Order'].map((item) => (
                  <li key={item}>
                    <a
                      href="#testimonios"
                      className="text-[#808080] hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#808080] text-sm">
              © 2024 La Calle. All rights reserved.
            </p>
            <p className="text-[#808080] text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-[#C41E3A]" /> for the streets
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
