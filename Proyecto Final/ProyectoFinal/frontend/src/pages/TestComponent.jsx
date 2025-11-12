export default function TestComponent() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f8ff',
      border: '2px solid #007bff',
      margin: '20px',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{color: '#007bff'}}>ðŸ§ª PRUEBA DE FUNCIONAMIENTO</h1>
      <div style={{backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px', marginBottom: '15px'}}>
        <h3>âœ… Estado del Sistema:</h3>
        <ul>
          <li>âœ… React funcionando</li>
          <li>âœ… Componente renderizando</li>
          <li>âœ… Estilos CSS aplicÃ¡ndose</li>
          <li>âœ… JavaScript ejecutÃ¡ndose</li>
        </ul>
      </div>
      
      <div style={{backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', marginBottom: '15px'}}>
        <h3>âš ï¸ Si ves este mensaje:</h3>
        <p>El problema <strong>NO</strong> estÃ¡ en React ni en Vite</p>
        <p>El problema estÃ¡ en el componente Home especÃ­fico</p>
      </div>
      
      <div style={{backgroundColor: '#f8d7da', padding: '15px', borderRadius: '5px'}}>
        <h3>âŒ Si no ves este mensaje:</h3>
        <p>Hay un problema con la configuraciÃ³n bÃ¡sica de React</p>
      </div>
      
      <button 
        onClick={() => alert('Â¡React estÃ¡ funcionando!')}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '15px'
        }}
      >
        ðŸ§ª Probar JavaScript
      </button>
    </div>
  );
}
