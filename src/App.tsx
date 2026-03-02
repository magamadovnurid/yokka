import './App.css'
import { MarketSearchResultsScreen } from './screens/MarketSearchResultsScreen'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Yokka: Market Search Template</h1>
        <p>Первый боевой экран по модели Avito. Собран из контрактных виджетов и синхронизирован с Storybook.</p>
      </header>
      <MarketSearchResultsScreen />
    </div>
  )
}

export default App
