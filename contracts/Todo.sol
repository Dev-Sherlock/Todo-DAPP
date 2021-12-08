pragma solidity >=0.4.22 <0.9.0;

contract Todo{

    uint taskCounter = 0;

    function createTask(string memory _content) public {
        taskCounter ++;
        Tasks[taskCounter] = Task(taskCounter, _content, false);
        emit TaskCreated(taskCounter, _content, false);
        }

      function toggleCompleted(uint _id) public {
          Task memory _task = Tasks[_id];
          _task.completed = !_task.completed;
          Tasks[_id] = _task;
          emit TaskCompleted(_id, _task.completed);
          }

    constructor() public{
        createTask("Initializing todo dapp ");
    }

    struct Task {
        uint id;
        string content;
        bool completed;
        }

    mapping(uint => Task) public Tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed
        );

    event TaskCompleted(
        uint id,
        bool completed
        );

}

