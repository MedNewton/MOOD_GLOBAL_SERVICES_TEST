import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';
import axios from 'axios';

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {
  
  const refreshDelay = 300000;
  const [GEXData, setGEXData] = useState();

  async function getGEXData(){
    const options = {
      method: 'GET',
      url: 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=100',
      headers: {
        'authorization': 'Apikey 5144d8cdffd91d36d321f9cd28f5679f7372cb1615b4d8ac8a7b7dbf0525f322',
      }
    };
    

    await axios.request(options).then(function (response) {
      console.log(response.data.Data.Data);
      setGEXData(response.data.Data.Data);

    }).catch(function (error) {
      console.error(error);
    });
  }



  useEffect(() => {
    getGEXData();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getGEXData();
    }, refreshDelay);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  const outerClasses = classNames(
    'cta section center-content-mobile reveal-from-bottom',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'cta-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    split && 'cta-split'
  );  

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div
          className={innerClasses}
        >
          <div className="cta-slogan">
            <h3 className="m-0">
              For previewing layouts and visual?
              </h3>
          </div>
          <div className="cta-action">
            <Input id="newsletter" type="email" label="Subscribe" labelHidden hasIcon="right" placeholder="Your best email">
              <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z" fill="#376DF9" />
              </svg>
            </Input>
          </div>
        </div>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;