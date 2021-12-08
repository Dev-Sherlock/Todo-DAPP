const Todo = artifacts.require('./Todo.sol')
contract('Todo', (accounts) => {
    before(async () => {
      this.todo = await Todo.deployed()
    })
    it('deploys successfully', async () => {
      const address = await this.todo.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
    it('lists tasks', async () => {
      const taskCounter = await this.todo.taskCounter
      const task = await this.todo.Tasks(taskCounter)
      assert.equal(task.id.toNumber(), taskCounter.toNumber())
      assert.equal(task.content, 'Check out Todo DAPP tasks')
      assert.equal(task.completed, false)
      assert.equal(taskCounter.toNumber(), 1)
    })
    it('creates tasks', async () => {
        const result = await this.todo.createTask('A new task')
        const taskCounter = await this.todo.taskCounter
        assert.equal(taskCounter, 2)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.content, 'A new task')
        assert.equal(event.completed, false)
      })
      it('toggles task completion', async () => {
        const result = await this.todo.toggleCompleted(1)
        const task = await this.todo.Tasks(1)
        assert.equal(task.completed, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
      })  
  })