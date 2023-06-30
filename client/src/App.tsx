import tw from 'tailwind-styled-components/';
import './App.css';
const Container = tw.div`
  bg-black
  w-12
  h-3
  
`;
function App() {
  return <Container>hello world!</Container>;
}

export default App;
