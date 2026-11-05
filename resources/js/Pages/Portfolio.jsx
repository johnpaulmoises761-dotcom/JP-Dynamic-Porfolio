import { Head } from '@inertiajs/react';
import Navbar from '../Components/portfolio/Navbar';
import Hero from '../Components/portfolio/Hero';
import About from '../Components/portfolio/About';
import Skills from '../Components/portfolio/Skills';
import ProjectsSection from '../Components/portfolio/ProjectsSection';
import Experience from '../Components/portfolio/Experience';
import Contact from '../Components/portfolio/Contact';
import Footer from '../Components/portfolio/Footer';
import useGlassGlow from '../hooks/useGlassGlow';
export default function Portfolio({projects=[],settings={},content={}}) {
 useGlassGlow();
 const profileUrl = settings.profile_image ? `/storage/${settings.profile_image}` : '/images/profile.jpg';
 return <>
  <Head title={`${settings.name||'Portfolio'} | Portfolio`} />
  <div className="bg" role="presentation" style={settings.background_image?{backgroundImage:`url(/storage/${settings.background_image})`}:undefined}/>
  <a href="#home" className="skip">Skip to content</a>
  <Navbar />
  <main><Hero settings={settings}/><About settings={settings} profileUrl={profileUrl}/>
   <Skills entries={content.skill??[]}/><ProjectsSection projects={projects}/>
   <Experience settings={settings} entries={content}/><Contact settings={settings}/></main>
  <Footer settings={settings}/>
 </>;
}
