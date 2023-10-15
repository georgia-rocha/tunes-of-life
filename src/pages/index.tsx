import 'tailwindcss/tailwind.css'
import Image from 'next/image'

export default function Page() {
  

  return (
  <div className="flex justify-around items-center">
    <Image
      src="/images/login.jpg"
      alt="img-tela-login"
      width={500}
      height={500} 
    />
    <form className="flex flex-col">
      <input type="email" placeholder="Digite seu Email" className="border rounded-md p-2 w-full text-gray-700 placeholder-gray-400" />
      <input type="password" placeholder="Digite sua senha" className="border rounded-md p-2 w-full text-gray-700 placeholder-gray-400"  />
      <button type="submit">Entrar</button>
    </form>
  </div>
  )
}