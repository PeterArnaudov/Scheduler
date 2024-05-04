import React, { FC } from "react";
import { LegendItem } from "../../models/items/legendItem";

interface LegendProps {
    items: LegendItem[]
}

const Legend: FC<LegendProps> = ({ items }) => {
    return (
        <div>
            {items.map((item, index) => {
                return (
                    <span key={index}>
                        <div className="d-inline-block me-3">
                            <div style={{
                                height: '25px',
                                width: '25px',
                                display: 'inline-block',
                                backgroundColor: item.color,
                                ...item.style,
                            }}></div>
                            <span className="align-top ms-1">{item.text}</span>
                        </div>
                    </span>
                )
            })}
        </div>
    )
};

export default Legend;