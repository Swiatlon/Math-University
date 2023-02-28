import { createGlobalStyle } from 'styled-components';
export const globalStyle = createGlobalStyle`
//Reseting Styles
*,
*::before,
*::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
    margin: 0;
    padding: 0;
}
#root{
    width: 100%;
    min-height: 100vh;
    position: relative;
    background: #F5FAFE;
}
a{
    text-decoration: none;
    color: white;
}

.error-message{
    color: red;
    text-align: center;
    font-weight: bold;
    margin-top: 14px;
}
.hide{
    display: none;
}
.show{
    display: initial;
}
`;
