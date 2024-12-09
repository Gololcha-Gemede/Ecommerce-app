import sideImg from '../../assets/images/side-img.png'
import frame1 from '../../assets/images/Frame1.png'
import frame2 from '../../assets/images/Frame2.png'
import frame3 from '../../assets/images/Frame3.png'
import frame4 from '../../assets/images/Frame4.png'
import frame5 from '../../assets/images/Frame5.png'
import frame6 from '../../assets/images/Frame6.png'
import frame7 from '../../assets/images/Frame7.png'
import frame8 from '../../assets/images/Frame8.png'
import frame9 from '../../assets/images/Frame9.png'
import frame10 from '../../assets/images/Frame10.png'
import './Abouts.css'
function Abouts(){
    return(
        <div className='abouts-container'>
            <div className="our-story">
                <p className="side-p"><h1>Our Story </h1>Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh.Supported by wide range of tailored marketing , data and service solutions.Exclusive has 10,500 sellers , 300 brands and serves 3 million customers across the region. <br /> <br /> Exclusive has more than 1 Million products to offer,growing at a very fast rate.Exclusive offers a diverse assortment in categories ranging from customers.</p>
                <img src={sideImg} alt="" className="side-img"/>
            </div>

            <ul className="numbers-list">
                <li><img src={frame1} alt="" /></li>
                <li><img src={frame2} alt="" /></li>
                <li><img src={frame3} alt="" /></li>
                <li><img src={frame4} alt="" /></li>
            </ul>

            <ul className="people-list">
                <li><img src={frame5} alt="" /></li>
                <li><img src={frame6} alt="" /></li>
                <li><img src={frame7} alt="" /></li>
            </ul>

            <ul className="service-list">
                <li><img src={frame8} alt="" /></li>
                <li><img src={frame9} alt="" /></li>
                <li><img src={frame10} alt="" /></li>
            </ul>
        </div>
    )
}
export default Abouts