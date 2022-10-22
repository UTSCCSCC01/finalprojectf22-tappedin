import React, { useState } from 'react';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div style={{ textAlign: 'left'}}>
          {title}
          <span style={{float:'right'}}>
            {isActive ? '˄' : '˅' }
          </span>
        </div>
        <hr style={{ background: 'black', height: '1px', }}/>
      </div>
      {isActive && <div style={{ paddingLeft:'1em', color:'GrayText' }}className="accordion-content">{content}</div>}
    </div>
  );
};

export default Accordion;