function Footer() {
  return (
    <footer className="bg-gray-800 py-4 mt-8">
      <p className="text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Jaison. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;