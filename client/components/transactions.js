import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class Transactions extends Component {
  state = { 
    currentTransactions: [],
    currentPage: null, 
    totalPages: null 
  }

  onPageChanged = data => {
    const { allTransactions } = this.props
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentTransactions = allTransactions.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentTransactions, totalPages });
  }

  render() {
    const {currentTransactions} = this.state
    //If the user has no stocks/has just signed up, show the alternate div encouraging them to begin trading!
    return transactions && transactions.length ? (
      <div className="transactions-container">
        <h3>Transaction History</h3>
        <ul className="transactions-header">
          <li>Action</li>
          <li>Stock Symbol</li>
          <li>Number of Shares</li>
          <li>Price Per Share</li>
          <li>Toal Value</li>
          <li>Date of Purchase</li>
        </ul>
        {transactions.map((currTrans, idx) => {
          return (
            <ul className={`transactions-row ${idx % 2 === 0 ? 'shade-alternate': '' }`} key={currTrans.id} >
              <li>{currTrans.action}</li>
              <li>{currTrans.stockSymbol}</li>
              <li>{`${currTrans.numOfShares} shares`}</li>
              <li>{`$${currTrans.price}/share`}</li>
              <li>{`$${Number(currTrans.value).toFixed(2)}`}</li>
              <li>{`${currTrans.createdAt.split('T')[0]}`}</li>
            </ul>
          )
        })}
      </div>
    ) : (
      <div className="no-data-container" >
        <h3>You have no transaction histrory</h3>
        <Link to="/user/trade_form"><h3>Click here to begin trading!</h3></Link>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allTransactions: state.user.transactions
  }
}

export default connect(mapState)(Transactions)
