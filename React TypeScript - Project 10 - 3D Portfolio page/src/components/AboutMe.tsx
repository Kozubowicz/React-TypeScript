export function AboutMe() {
  const message = 'Frontend Developer (JavaScript, React, TypeScript)';

  return (
    <>
      <div className='AboutMe'>
        <div className='AboutMe-left'>
          <div className='AboutMe-left--img'>
            <img src='./profileImg.png' alt='picture' />
          </div>

          <div className='AboutMe-left-list'>
            <div className='AboutMe-left-list-item'>
              <div className='AboutMe-left-list-item--img'>
                <img src='./logos/LinkedIn.png' alt='LinkedIn' />
              </div>
              <a
                className='AboutMe-left-list-item--link'
                href='https://www.linkedin.com/in/piotr-kozubowicz-2051b9275/'
              >
                LinkedIn
              </a>
            </div>

            <div className='AboutMe-left-list-item'>
              <div className='AboutMe-left-list-item--img'>
                <img src='./logos/GitHub.png' alt='LinkedIn' />
              </div>
              <a
                className='AboutMe-left-list-item--link'
                href='https://github.com/Kozubowicz'
              >
                GitHub
              </a>
            </div>

            <div className='AboutMe-left-list-item'>
              <div className='AboutMe-left-list-item--img'>
                <img src='./logos/email.png' alt='LinkedIn' />
              </div>
              <a
                className='AboutMe-left-list-item--link'
                href='mailto:kozubowiczpiotr@gmail.com'
              >
                kozubowiczpiotr@gmail.com
              </a>
            </div>

            <div className='AboutMe-left-list-item'>
              <div className='AboutMe-left-list-item--img'>
                <img src='./logos/portfolio.png' alt='LinkedIn' />
              </div>
              <a
                className='AboutMe-left-list-item--link'
                href='https://kozubowicz-portfolio.onrender.com'
              >
                Full portfolio on Express.js
              </a>
            </div>
          </div>
        </div>
        <div className='AboutMe-right'>
          <div className='AboutMe-right--name'>Piotr Kozubowicz</div>
          <div className='AboutMe-right--position'>
            {message.split('').map((el, i) => (
              <span key={i} style={{ '--i': i } as React.CSSProperties}>
                {el}
              </span>
            ))}
          </div>
          <div className='AboutMe-right--descrition'>
            I am a Front-End Developer with a strong foundation in JavaScript
            and React, driven by a passion for writing efficient, high-quality
            code. With a background in electronics engineering from Wrocław
            University of Technology, I have developed strong analytical skills
            essential for tackling complex challenges. Currently, I focus on
            deepening my expertise in JavaScript, working within the Visual
            Studio Code environment and utilizing frameworks like Node.js and
            Express.js. My portfolio showcases projects that have received
            positive feedback, reflecting my commitment to continuous learning
            and growth. Passionate about AI, I am eager to contribute to a
            collaborative, growth-oriented team.
          </div>
          <div className='AboutMe-right--languages'>
            Languages:
            <div className='AboutMe-right--languages-item'>
              <b>Polish</b> Native
            </div>
            <div className='AboutMe-right--languages-item'>
              <b>English</b> Advanced level C1
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
