const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center">
       <div className="flex flex-col items-center text-lg font-bold">
        <h2>Contato</h2>
         <div className="flex flex-row items-center space-x-2">
            <div>
              <a href="mailto: wesleycariutaba@gmail.com">
                <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail badge"/>
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/cicero-wesley/">
                <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin badge"/>
              </a>
            </div>
            <div>
              <a href="https://github.com/CiceroWesley/">
                <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Github badge"/>
              </a>
            </div>
               </div>
       </div>
      <div>Copyright &copy; 2023 Cicero Wesley</div>
    </footer>
  )
}

export default Footer