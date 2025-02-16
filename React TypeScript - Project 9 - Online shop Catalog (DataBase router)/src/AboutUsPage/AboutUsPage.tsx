import './AboutUsPage.css';

import insta from '/insta.png';
import linked from '/linkedIn.png';

import team from './team.json';

export function AboutUsPage() {
  return (
    <>
      <div className='AboutUsPage'>
        <div className='AboutUsPage-section'>
          <div className='AboutUsPage-section-header'>Our team</div>
          <div className='AboutUsPage-team'>
            {team.map((worker) => (
              <div
                className='AboutUsPage-team-item'
                key={worker.id}
                style={{ backgroundImage: `url(${worker.img})` }}
              >
                <div className='AboutUsPage-team-item-props'>
                  <div className='AboutUsPage-team-item-links'>
                    <div className='AboutUsPage-team-item-links-item'>
                      <div className='AboutUsPage-team-item-links-item--des'>
                        Instagram
                      </div>
                      <img
                        className='AboutUsPage-team-item-links-item-des--img'
                        src={insta}
                        alt='insta'
                      />
                    </div>

                    <div className='AboutUsPage-team-item-links-item'>
                      <div className='AboutUsPage-team-item-links-item--des'>
                        LinkedIn
                      </div>
                      <img
                        className='AboutUsPage-team-item-links-item-des--img'
                        src={linked}
                        alt='linkedIn'
                      />
                    </div>
                  </div>
                  <div className='AboutUsPage-team-item-person'>
                    <div className='AboutUsPage-team-item-person--name'>
                      {worker.name}
                    </div>
                    <div className='AboutUsPage-team-item-person--position'>
                      {worker.position}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='AboutUsPage-section'>
          <div className='AboutUsPage-section-header'>Our Products</div>
          <ul className='AboutUsPage-products-list'>
            <li className='AboutUsPage-products-list-item'>
              <div className='AboutUsPage-products-list-item--header'>
                Protein Powder
              </div>
              <ul className='AboutUsPage-products-list-item--body'>
                <li className='AboutUsPage-products-list-item--body-item'>
                  Supports muscle growth and repair
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Aids in weight management
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Improves recovery after workouts
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Helps meet daily protein intake goals
                </li>
              </ul>
            </li>
            <li className='AboutUsPage-products-list-item'>
              <div className='AboutUsPage-products-list-item--header'>
                Creatine
              </div>
              <ul className='AboutUsPage-products-list-item--body'>
                <li className='AboutUsPage-products-list-item--body-item'>
                  Increases strength and power
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Enhances muscle growth
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Improves exercise performance
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Supports brain function
                </li>
              </ul>
            </li>
            <li className='AboutUsPage-products-list-item'>
              <div className='AboutUsPage-products-list-item--header'>
                Vitamins Pills
              </div>

              <ul className='AboutUsPage-products-list-item--body'>
                <li className='AboutUsPage-products-list-item--body-item'>
                  Supports immune function
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Improves energy levels
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Enhances overall health
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Prevents nutritional deficiencies
                </li>
              </ul>
            </li>
            <li className='AboutUsPage-products-list-item'>
              <div className='AboutUsPage-products-list-item--header'>
                Caffeine
              </div>

              <ul className='AboutUsPage-products-list-item--body'>
                <li className='AboutUsPage-products-list-item--body-item'>
                  Enhances mental alertness
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Boosts energy levels
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Improves endurance and performance
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Aids in fat burning
                </li>
              </ul>
            </li>
            <li className='AboutUsPage-products-list-item'>
              <div className='AboutUsPage-products-list-item--header'>
                Pre-Workout Supplements
              </div>
              <ul className='AboutUsPage-products-list-item--body'>
                <li className='AboutUsPage-products-list-item--body-item'>
                  Boosts energy and focus
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Enhances endurance
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Increases muscle pumps
                </li>

                <li className='AboutUsPage-products-list-item--body-item'>
                  Improves performance
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
