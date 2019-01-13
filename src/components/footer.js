import React from 'react'
import { Link } from 'gatsby'

const header = () => {
  return (
    <footer className="footer">
      <div className="content">
        <div className="columns">
        <div className="column is-12-mobile is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen is-6-fullhd is-offset-3-fullhd">
          <div className="columns is-multiline">
              <div className="column">
                <h2 className="h2">Seiten</h2>
                <Link to="/">Home</Link><br />
                <Link to="/overview/">Übersicht</Link><br />
                <Link to="/categories/">Kategorien</Link><br />
                <Link to="/new-shop/">Ihren Shop eintragen</Link>
              </div>
              <div className="column">
                <h2 className="h2">Weitere Infos</h2>
                <Link to="/about-us/">Über uns</Link><br />
                <Link to="/impressum/">Impressum</Link><br />
              </div>
              <div className="column is-12">
                <span>&copy; 2019 Andrea Huber, Simon Freiermuth, Tim König, Timon Forrer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default header
