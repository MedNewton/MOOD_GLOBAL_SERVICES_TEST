import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [currentGEXData, setCurrentGEXData] = useState({ currentPrice: 0, currentMktCap: 0, volume24Hrs: 0, open24Hrs: 0, low24Hrs: 0, high24Hrs: 0, changePCT24Hrs: 0 });

  async function getCurrentGEXData(){
    const options = {
      method: 'GET',
      url: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD',
      headers: {
        'authorization': 'Apikey 5144d8cdffd91d36d321f9cd28f5679f7372cb1615b4d8ac8a7b7dbf0525f322',
      }
    };

    await axios.request(options).then(function (response) {
      console.log(response.data.RAW.ETH.USD);
      let responseRawData = response.data.RAW.ETH.USD;
      setCurrentGEXData({ currentPrice: responseRawData.PRICE, currentMktCap: responseRawData.MKTCAP, volume24Hrs: responseRawData.VOLUME24HOUR, open24Hrs: responseRawData.OPEN24HOUR, low24Hrs: responseRawData.LOW24HOUR, high24Hrs: responseRawData.HIGH24HOUR, changePCT24Hrs: responseRawData.CHANGEPCT24HOUR })
      
    }).catch(function (error) {
      console.error(error);
    });
  }


  async function getGEXData(){
    const options = {
      method: 'GET',
      url: 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=100',
      headers: {
        'authorization': 'Apikey 5144d8cdffd91d36d321f9cd28f5679f7372cb1615b4d8ac8a7b7dbf0525f322',
      }
    };
    

    await axios.request(options).then(function (response) {
      //console.log(response.data);
      setGEXData(response.data.Data.Data);

    }).catch(function (error) {
      console.error(error);
    });
  }



  useEffect(() => {
    getCurrentGEXData();
    getGEXData();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentGEXData();
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
      
      <Container className='generalDataBar'>
        <Row className='generalDataInner'>
          <Col sm={2} lg={2} md={2} className='generalDataTitle'>
            <h5>ETH/USD</h5>
          </Col>
          <Col className='generalDataColumn'>
            <Row>
            <Col>
            <p className='generalDataColumnLabel'>Price</p>
            </Col>
            </Row>
            <Row>
            <Col>
            <p className='generalDataColumnContent'>{currentGEXData.currentPrice}</p>
            </Col>
            </Row>
          </Col>
          <Col className='generalDataColumn'>
            <Row>
            <Col>
            <p className='generalDataColumnLabel'>Mkt. Cap</p>
            </Col>
            </Row>
            <Row>
            <Col>
            <p className='generalDataColumnContent'>+{Math.round(currentGEXData.currentMktCap / 1000000000)} B</p>
            </Col>
            </Row>
          </Col>
          <Col className='generalDataColumn'>
            <Row>
            <Col>
            <p className='generalDataColumnLabel'>Vol 24h</p>
            </Col>
            </Row>
            <Row>
            <Col>
            <p className='generalDataColumnContent'>+{Math.round(currentGEXData.volume24Hrs / 1000)} K</p>
            </Col>
            </Row>
          </Col>
          <Col className='generalDataColumn'>
            <Row>
            <Col>
            <p className='generalDataColumnLabel'>Open 24H</p>
            </Col>
            </Row>
            <Row>
            <Col>
            <p className='generalDataColumnContent'>{currentGEXData.open24Hrs}</p>
            </Col>
            </Row>
          </Col>
          <Col xs={3} className='generalDataColumn wideDataColumn'>
            <Row>
            <Col>
            <p className='generalDataColumnLabel'>Low / High 24h</p>
            </Col>
            </Row>
            <Row>
            <Col className='wideDataColumn'>
            <p className='generalDataColumnContent'>{currentGEXData.low24Hrs} - {currentGEXData.high24Hrs}</p>
            </Col>
            </Row>
          </Col>
          <Col className='generalDataColumn'>
            <Row>
            <Col>
            <p className='generalDataColumnLabel'>Change 24H</p>
            </Col>
              
            </Row>
            <Row>
              <Col>
                <p className='generalDataColumnContent'>{Math.round(currentGEXData.changePCT24Hrs).toFixed(2)}%</p>
              </Col>
              
            </Row>
          </Col>
          
        </Row>
      </Container>
      <Container className='chart'>
        <Row>
          <Col>
            <Tabs 
            defaultActiveKey="OverView"
            id="fill-tab-example">
              <Tab eventKey={"OverView"} title={"OverView"} tabClassName={"tabTitle"}>
                <Row>
                  <Col>
                    <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                    </p>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={"Index"} title={"Cryptocompare Index"}>
                <Row>
                  <Col>
                    <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                    </p>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={"Volume"} title={"Volume"}>
                <Row>
                  <Col>
                    <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                    </p>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;