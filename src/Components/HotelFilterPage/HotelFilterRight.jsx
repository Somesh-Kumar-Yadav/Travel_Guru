import React from 'react'
import styles from "../../Styles/hotelFilter.module.css"
import SearchIcon from '@material-ui/icons/Search';
import HotelFilterCard from './HotelFilterCard';
import { useSelector } from 'react-redux';

export function HotelFilterRight(props) {
    const [min, setMin] = React.useState(100000);
    const [minStr, setMinStr] = React.useState("")
    const data = useSelector((state) => state.hotel.data);
    const handleSort=(str) => {
        switch(str){
            case "recommended": {
                props.setData(data);
                break;
                }
            case "price": {
                console.log("ll")
                const payload = data.sort((a,b) => {
                    return a.price-b.price;
                })
                console.log(payload)
                props.setData(payload)
                break;
                }
            case "rating": {
                console.log("ll")
                const payload = data.sort((a,b) => {
                    return a.rating-b.rating;
                })
                console.log(payload)
                props.setData(payload)
                break;
                }
            case "trip": {
                console.log("ll")
                const payload = data.sort((a,b) => {
                    return a.tripAdvisorRating-b.tripAdvisorRating;
                })
                console.log(payload)
                props.setData(payload)
                console.log(props.data)
                break;
                }
            default: {
                break;
                }
        }
    }
    React.useEffect(() => {
        data.map(item => {
            if (item.price < min) {
                setMin(item.price);
                setMinStr(item.sPrice);
            }
            return item;
        })
    },[min,data])
    return <div className={ styles.hotel_right_container}>
        <div className={ styles.hotel_right_container_top}>
            <div className={ styles.hotel_right_container_top_top}><button className={ styles.hotel_right_container_top_btn}><SearchIcon className={styles.search_icon} color="disabled"/>Modify Search</button></div>
            <div className={ styles.hotel_right_container_top_bottom}><h6>Leh</h6><p>SAT, 28 AUG - SUN, 29 AUG (1 NIGHT)  | 1 ROOM | 1 ADULT</p></div>
        </div>
        <div className={ styles.hotel_right_container_middle_top}>
            <div className={styles.hotel_right_container_middle_top_top}>
                <button>ALL HOTELS<br/>from ₹ {minStr}</button>
            </div>
            <div className={styles.hotel_right_container_middle_top_bottom}>
                <button>VILLAS AND STAYS<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ₹ 5,000</button>
                <button>LIST | <span>MAPS</span></button>
            </div>
        </div>
        <div className={ styles.hotel_right_container_middle_bottom}>
            <div className={styles.hotel_right_container_middle_bottom_top}>
                <div>SORT BY:</div>
                <div onClick={()=>{
                    handleSort("recommended")
                }} className={styles.div_hover}>RECOMMENDED</div>
                <div onClick={()=>{
                    handleSort("rating")
                }} className={styles.div_hover}>STAR RATING</div>
                <div onClick={()=>{
                    handleSort("trip")
                }} className={styles.div_hover}>TRIPADVISOR RATING</div>
                <div onClick={()=>{
                    handleSort("price")
                }} className={styles.div_hover}>PRICE <span>(TAXES EXTRA)</span></div>
            </div>
        </div>
        <div className={styles.hotel_right_card}>
            {data.map(item => <HotelFilterCard key={item.id} data={ item}/>)}
        </div>
    </div>
}