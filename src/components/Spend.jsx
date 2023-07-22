import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import SavingsIcon from '../img/icono_ahorro.svg';
import HouseIcon from '../img/icono_casa.svg';
import FoodIcon from '../img/icono_comida.svg';
import SpendsIcon from '../img/icono_gastos.svg';
import LeisureIcon from '../img/icono_ocio.svg';
import HealthIcon from '../img/icono_salud.svg';
import SubscriptionsIcon from '../img/icono_suscripciones.svg';


const Gasto = ({ spend, setSpendEdit, deleteSpend }) => {
    const iconsDictionary = {
        savings: SavingsIcon,
        food: FoodIcon,
        home: HouseIcon,
        expenses: SpendsIcon,
        leisure: LeisureIcon,
        health: HealthIcon,
        subscriptions: SubscriptionsIcon,
    }
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setSpendEdit(spend)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => deleteSpend(spend.id)} destructive={true}>
                Delete
            </SwipeAction>
        </TrailingActions>
    )
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className="contenido-gasto">
                        <img src={`${iconsDictionary[spend.spendCategory]}`} alt="Spend icon" />
                        <div className="descripcion-gasto">
                            <p className="categoria">
                                {spend.spendCategory}
                            </p>
                            <p className='nombre-gasto'>
                                {spend.spendName}
                            </p>
                            <p className='fecha-gasto'>
                                Added:
                                <span> {spend.date}</span>
                            </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>
                        {spend.amount}
                    </p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto