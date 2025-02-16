export function AboutMe() {
  return (
    <>
      <div className='AboutMe'>
        <div className='AboutMe-left'>
          <div className='AboutMe-left--img'>
            <img src='./profileImg.png' alt='picture' />
          </div>
        </div>
        <div className='AboutMe-right'>
          <div className='AboutMe-right--name'>Piotr Kozubowicz</div>
          <div className='AboutMe-right--position'>
            Frontend Developer (JavaScript, React, TypeScript)
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
