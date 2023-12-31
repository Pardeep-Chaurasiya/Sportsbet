import React from 'react'
import {
  oddConvert
} from '../../common'
export  default class LiveBtn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        opened: false,
        loadGames: false,
        games: [], data: [],
        gamesArr: []
      };
      this.priceBtn = null;
      this.timeoutId= null
        this.eventData = { price: null, initialPrice: null }
    }
    componentWillUnmount() {
      clearTimeout(this.timeoutId)
    }
    componentDidUpdate() {
      if (this.eventData.price !== this.props.e.price &&
        this.eventData.initialPrice !== this.props.e.initialPrice) {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(function () {
          if (undefined !== this.priceBtn && null !== this.priceBtn) {
            this.priceBtn.classList.remove('coeficiente-change-up');
            this.priceBtn.classList.remove('coeficiente-change-down');
          }
        }.bind(this), 10000);
        this.eventData.price = this.props.e.price
        this.eventData.initialPrice = this.props.e.initialPrice
      }
    }
    render() {
      const {
        props: { game, betSelections, e, eventMarket, addEventToSelection, oddType,competition,sport ,region}
      } = this
      return (
        <div ref={(el) => { this.priceBtn = el }} className={`sb-game-bet-block-inner ${betSelections[eventMarket.id] && betSelections[eventMarket.id].eventId === e.id ? 'selected-event' : ''} ${e.initialPrice ? (e.initialPrice > e.price && !game.is_blocked) ? 'coeficiente-change-down' : (e.initialPrice < e.price && !game.is_blocked) ? 'coeficiente-change-up' : '' : ''}`}
          title={e.type ? (e.type).replace(/P1/g, "1").replace(/P2/g, "2") : null}
          onClick={() => { !game.is_blocked && addEventToSelection(game, eventMarket, e,{competition:competition,sport:sport,region:region}) }}>
          {!game.is_blocked &&<div className="sb-game-bet-coeficiente">{oddConvert({
            main: {
              decimalFormatRemove3Digit: 0,
              notLockedOddMinValue: null,
              roundDecimalCoefficients: 3,
              showCustomNameForFractionalFormat: null,
              specialOddFormat: null,
              useLadderForFractionalFormat: 0
            }, env: { oddFormat: null }
          }, { mathCuttingFunction: () => { } })(e.price, oddType)}</div>}
          <i className="blocked-icon" style={{display:game.is_blocked ? 'flex': 'none'}}></i>
        </div>
      )
    }
  }