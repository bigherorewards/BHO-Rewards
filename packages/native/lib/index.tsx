import React, { useState, useRef } from "react"
// import{} from
import { View, Button, DrawerLayoutAndroid, NativeModules } from "react-native"
import { EventEmitter } from "fbemitter"
const Hamburger: React.FC<{ position: "absolute" | number }> = () => null
class Camera extends NativeModules.Camera {}
class Main extends React.Component {
  public camera: Camera = new Camera()
}

const App: React.FC<{ main: Main; camera: Camera; test: 1 }> = props => (
  <View>
    <Hamburger position="absolute" />
    <DrawerLayoutAndroid renderNavigationView={() => null} />
    <Button title="hi" onPress={() => 1} />
  </View>
)
export default App

function useToggle<T, U>(options: {
  choices: ([T, U] | [U, T]) extends infer V ? V : any[]
  default: 0 | 1
}) {
  const ref = useRef({
    index: options.default
  })
  const [choice, setChoice] = useState<T | U>(options.choices[options.default])
  function toggle() {
    setChoice(options.choices[ref.current.index])
    switch (ref.current.index) {
      case 0:
        ref.current.index = 1
        break
      case 1:
        ref.current.index = 0
        break
      default:
        ref.current.index = options.default
    }
  }

  return [choice, toggle]
}

type Props<T> = T extends React.ComponentType<infer P> ? P : never
const instanceOf = <T extends Function>(b: T) => (a: unknown): a is T =>
  a instanceof b
const instance = {
  Of: {
    RCC: instanceOf(React.Component),
    RPC: instanceOf(React.PureComponent)
  }
}
const isElement = (a: unknown): a is JSX.Element =>
  !instance.Of.RCC(a) &&
  !instance.Of.RPC(a) &&
  typeof a !== "function" &&
  (a as JSX.Element).type
function reduceEl<T extends React.ComponentType<any>>(
  MC: T,
  ...els: Array<React.ComponentType | JSX.Element>
) {
  return <P extends Props<T>>(props: P) => {
    const MainComponent = React.useCallback(() => <MC {...props} />, [props])
    const render = React.useCallback((Main: React.ComponentType) => {
      return (Child: React.ComponentType | JSX.Element) => (
        <>
          <Main />
          {isElement(Child) ? Child : <Child />}
        </>
      )
    }, [])

    const renderElement = React.useMemo(() => render(MainComponent), [
      MainComponent
    ])
    return els.reduce((renderEl, el, i, arr) => {
      const currentMain = () => renderEl(el)
      if (i === arr.length - 1) {
        return currentMain()
      }
      return render(currentMain)
    }, renderElement) as JSX.Element
  }
}

const Reducer = reduceEl(App, App, App)
