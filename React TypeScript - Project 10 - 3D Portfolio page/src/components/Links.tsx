export function Links() {
  return (
    <>
      <div className='Links'>
        <div className='Links-Header'>Links</div>
        <div className='Links-list'>
          <div className='Links-list-item'>
            <div className='Links-list-item--img'>
              <img src='./logos/LinkedIn.png' alt='LinkedIn' />
            </div>
            <a
              className='Links-list-item--link'
              href='https://www.linkedin.com/in/piotr-kozubowicz-2051b9275/'
            >
              LinkedIn
            </a>
          </div>

          <div className='Links-list-item'>
            <div className='Links-list-item--img'>
              <img src='./logos/GitHub.png' alt='LinkedIn' />
            </div>
            <a
              className='Links-list-item--link'
              href='https://github.com/Kozubowicz'
            >
              GitHub
            </a>
          </div>

          <div className='Links-list-item'>
            <div className='Links-list-item--img'>
              <img src='./logos/email.png' alt='LinkedIn' />
            </div>
            <a
              className='Links-list-item--link'
              href='mailto:kozubowiczpiotr@gmail.com'
            >
              kozubowiczpiotr@gmail.com
            </a>
          </div>

          <div className='Links-list-item'>
            <div className='Links-list-item--img'>
              <img src='./logos/portfolio.png' alt='LinkedIn' />
            </div>
            <a
              className='Links-list-item--link'
              href='https://kozubowicz-portfolio.onrender.com'
            >
              Full portfolio on Express.js
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
