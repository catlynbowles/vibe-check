import React, { useState, useEffect } from 'react'
import { getData } from '../../../apiCalls'
import { Link } from 'react-router-dom'
import './FeelingView.scss'
import LoadingIcon from '../../../LoadingIcon/LoadingIcon'
import Error from '../../Error/Error'
import PropTypes from 'prop-types'
import StatsBox from '../../StatsBox/StatsBox'


const FeelingView = ({ id }) => {
  const [localTotals, setLocalTotals] = useState('')
  const [globalTotals, setGlobalTotals] = useState('')
  const [secondaryEmotions, setSecondaryEmotions] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const localTotal = getData(`https://arcane-hollows-12884.herokuapp.com/https://wefeel.csiro.au/main/api/zones/continents/northAmerica/timezones/timepoints?primaryEmotion=${id}`)
    const primaryGlobalTotals = getData('https://arcane-hollows-12884.herokuapp.com/https://wefeel.csiro.au/main/api/emotions/primary/totals')
    const secondaryEmotions = getData(`https://arcane-hollows-12884.herokuapp.com/https://wefeel.csiro.au/main/api/emotions/primary/${id}/secondary`)

    Promise.all([localTotal, primaryGlobalTotals, secondaryEmotions])
      .then(data => {
        setLocalTotals(data[0][0].counts['northAmerica/mountain'])
        setGlobalTotals(data[1][id])
        setSecondaryEmotions(data[2])
      })
      .catch(err => setError(`${err}`))
  }, [])

  return (
    <section className='page-container'>
      <article className='stats-container'>
        <h2 className='small-header' tabIndex='0'>If you feel {id} today, you're not alone. There are:</h2>
        {error ? <Error text={error} /> :
          !localTotals && !globalTotals ? <LoadingIcon /> :
            <div>
              <StatsBox localTotals={localTotals} globalTotals={globalTotals} secondaryEmotions={secondaryEmotions} />
            </div>
        }
      </article>
      <Link to='/connect' style={{ textDecoration: 'none' }}>
        <div className='feelingButton home-button'><p>Back</p></div>
      </Link>

    </section>
  )
}

export default FeelingView;

FeelingView.propTypes = {
  id: PropTypes.string.isRequired
}