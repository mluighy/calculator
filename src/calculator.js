import { useState } from 'react';

function Calculator() { 
    const [ [ number, exp], setNumber] = useState( ['0',''])
    function click(e) {
        setNumber( ([prevN,prevE]) => { 
            const button = e.target.value
            const prevELast = prevE.charAt(prevE.length-1)
            let i
            if(button==='C') {
                return ['0','']
            } else if( prevN==='0' && button==='0') {
                // nothing to do                
            } else if( button === '=' && (prevE.indexOf('=') == -1)) {
                // evalute it BUT just one times it is allowed!
                prevN = String( eval( prevE))
                prevE += '='+prevN
            } else if( '*/+-'.indexOf(button) > -1) {
                // new operation
                prevN = ''
                if( '+-'.indexOf(button) > -1)
                    // sign character
                    prevN = button
                if(prevE.indexOf('=') > -1)
                    // expression
                    prevE = prevE.substring( prevE.indexOf('=')+1)
                if('*/+-'.indexOf(prevELast) > -1 ) {
                    // operation on the last position
                    i = 1
                    if(prevELast==='-' && button != '-') {
                        if( '*/'.indexOf(prevE.charAt(prevE.length-2)) > -1 )
                            // character before the last one is operation too
                            i++
                    } else if('*/'.indexOf(prevELast) > -1 && button === '-')
                                // just the minus sign has to add
                                i = 0
                    if(i>0)             
                        // the operation is at the end has to be cut
                        prevE = prevE.substring(0, prevE.length-i)
                }
                prevE += button    
            } else if( button >= '0' && button <= '9') {
                if( prevE.indexOf('=') > -1){
                    // new operation is starting
                    prevE = ''
                    prevN = ''
                } else if( prevN==='0' && button >= '1') {
                    // last number is being cut 
                    prevN = ''
                    prevE = prevE.substring( 0, prevE.length-2)
                }    
                prevN += button
                prevE += button
            } else if(button==='.' && prevN.indexOf('.') == -1 ){
                // decimal point handling
                if(prevE.indexOf('=') > -1) {
                    prevE = '0'
                    prevN = '0'
                } else if(prevN==='0') {
                    prevE += '0'
                }
                prevE += '.'
                prevN += '.'
            }
            return [ prevN, prevE]
        })
    }

    return (
        <>
        <div id='calculator'>
            <div id='result'>
                <div id='display'>{number}</div>
                <div id='expression'>{exp}</div>
            </div>
            <button onClick={click} value={'C'} id='clear'>AC</button>
            <button onClick={click} value={'/'} id='divide'>/</button>
            <button onClick={click} value={'*'} id='multiply'>*</button>
            <button onClick={click} value={'1'} id='one'>1</button>
            <button onClick={click} value={'2'} id='two'>2</button>
            <button onClick={click} value={'3'} id='three'>3</button>
            <button onClick={click} value={'4'} id='four'>4</button>
            <button onClick={click} value={'5'} id='five'>5</button>
            <button onClick={click} value={'6'} id='six'>6</button>
            <button onClick={click} value={'7'} id='seven'>7</button>
            <button onClick={click} value={'8'} id='eight'>8</button>
            <button onClick={click} value={'9'} id='nine'>9</button>
            <button onClick={click} value={'0'} id='zero'>0</button>
            <button onClick={click} value={'.'} id='decimal'>.</button>
            <button onClick={click} value={'+'} id='add'>+</button>
            <button onClick={click} value={'-'} id='subtract'>-</button>
            <button onClick={click} value={'='} id='equals'>=</button>
        </div>
        </>
    )
}

export default Calculator;