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
    
                //-------------------------우클릭
                blockDom.addEventListener('contextmenu', (e) => {
                    e.preventDefault()
                    if(block.clicked) return;
                    if(block.flagged) {
                        block.flagged = false
                        blockDom.classList.remove('flagged')
                        flag += 1
                    } else {
                        block.flagged = true
                        blockDom.classList.add('flagged')
                        flag -= 1
                    }
                    // flagRemain.innerHTML = flag // 남은 깃발 수 update
                })
            }
            gameBoard.appendChild(rowDom)
    
            rows.push(row)
        }

        //-----------------------지뢰배치
        let n = 0
        while(n < numMine) {
            x = Math.floor(Math.random() * (width-1))
            y = Math.floor(Math.random() * (height-1))
            if(rows[y][x].isMine) continue
            else {
                rows[y][x].isMine = true
                n += 1
            }
        }
    }
    initGame(width, height, numMine)
    
    //클릭될 수 있는 block을 제외한 block array return
    const getUnclickedNeighbors = (block) => {
        const x = block.x
        const y = block.y
        const neighbors = []
    
        for(let i = Math.max(0, y); i <= Math.min(y+1, height.value-1); i++) {
            for(let j = Math.max(0, x-1); j <= Math.min(x+1, width.value-1); j++) {
                if(x===j && y===i) continue;
                if(rows[i][j].clicked | rows[i][j].willClicked) continue;
                else {
                    neighbors.push(rows[i][j])
                }
            }
        }
        return neighbors
    }
}