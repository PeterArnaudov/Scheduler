const Legend = ({ legendItems }) => {
    return (
        <div>
            {legendItems.map((legendItem, index) => {
                return (
                    <span key={index}>
                        <div className="d-inline-block me-3">
                            <div style={{
                                height: '25px',
                                width: '25px',
                                display: 'inline-block',
                                ...legendItem.style,
                                backgroundColor: legendItem.color,
                            }}></div>
                            <span className="align-top ms-1">{legendItem.text}</span>
                        </div>
                    </span>
                )
            })}
        </div>
    )
};

export default Legend;