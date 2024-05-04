import React, { FC, ReactNode } from "react";

interface ResultProps {
    isSuccess: boolean,
    message: string,
    children: ReactNode[]
}

const Result: FC<ResultProps> = ({ isSuccess, message, children }) => {
    return (
        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            <p>{message}</p>
            <p>{isSuccess}</p>
            {children?.map((button, index) => (
                <span key={index} className="me-2">
                    {button}
                </span>
            ))}
        </div>
    );
}

export default Result;