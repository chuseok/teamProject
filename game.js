window.onload = function() {
    const width = 10
    const height = 10
    const numMine = 5
    const gameBoard = document.getElementById('gameBoard')
    const startButton = document.getElementById('start')
    const introduction =document.getElementById('beforeStart')
    const restartButton = document.getElementById('restart')
    const flagRemain = document.getElementById('flagRemain')
    const timerText = document.getElementById('timer')
    
    const gameResult = document.getElementById('gameResult')
    
    let rows = []
    let sec = 0
    let onGame = false
    let flag = 0
    let resultText = ''

    //start click
    startButton.addEventListener('click', (e) => {
        introduction.className='hidden'
        initGame(width, height, numMine)
    })

    const initGame = (width, height, numMine) => {
        rows = []
        onGame = true
        flag = numMine
        resultText = ''
        sec = 0
    
        gameBoard.innerHTML = ''
        gameResult.innerHTML = resultText
        flagRemain.innerHTML = flag
        timerText.innerHTML = sec
        gameBoard.className = ''
        
        //--------------------createRows
        for(let i=0; i<height; i++) {
            const row = []
            const rowDom = document.createElement('div')
            rowDom.className = 'row';

            for(let j=0; j<width; j++) {
                const blockDom = document.createElement('div')
                blockDom.className = 'block'
                rowDom.appendChild(blockDom)
    
                const block = {
                    blockDom,
                    x: j,
                    y: i,
                    isMine: false,
                    clicked:false,
                    flagged: false,
                    willClicked: false
                }
                row.push(block)
            }
            gameBoard.appendChild(rowDom)
    
            rows.push(row)
        }
    }
    initGame(width, height, numMine)
    
}