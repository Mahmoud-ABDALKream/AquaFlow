import logo from '@/assets/aquaflow-logo.png'
import { Mail, MapPin } from 'lucide-react'

export function AquaFooter() {
  return (
    <footer id="contact" className="py-16 bg-[#001d3d] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Aqua Flow" className="h-20 w-20 object-contain -my-4" />
              <span className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk' }}>
                Aqua<span className="text-[#00d4ff]">Flow</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Smart water management for a sustainable future. Monitor, control, and conserve — all from your phone.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#team" className="hover:text-white transition-colors">Team</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#00d4ff]" />
                <span>aquaflow@contact.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#00d4ff]" />
                <span>Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Aqua Flow. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
