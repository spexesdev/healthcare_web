import { Cards } from './cards'
import cardsValues from './cards-values'

export const CardBox = () => {
    const vals = cardsValues.map(item => {
        return (<Cards
            key={item.id}
            numbers={item.numbers}
            totalCases={item.cases}
            lastUpdatedTime={item.lastUpdatedTime}
            icofontClass={item.icofontClass}
        />)
    })

    return (
        
        <div className="cardBox">
            {vals}
        </div>

    )
}
