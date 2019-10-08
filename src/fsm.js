class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    this.states = config.states;
    this.state = config.initial;
    this.initial = config.initial;
    this.history = [];
    this.undoHistory = [];
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.state;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    if (!this.states.hasOwnProperty(state)) {
      throw Error("error state!");
    }
    this.history.push(this.state);
    this.state = state;
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    if (!this.states[this.state].transitions[event]) {
      throw Error("error event!");
    }
    this.history.push(this.state);
    this.state = this.states[this.state].transitions[event];
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.state = this.initial;
    this.history = [];
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    if (!event) {
      return Object.keys(this.states);
    }
    const statesFromEvent = [];
    const arrStates = Object.entries(this.states);
    arrStates.map(el => {
      if (Object.keys(el[1].transitions).includes(event))
        statesFromEvent.push(el[0]);
    });
    return statesFromEvent;
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    if (this.history.length < 1) {
      return false;
    }
    if (this.history[this.history.length - 1] === this.state) {
      return false;
    }
    this.undoHistory.push(this.state);
    this.state = this.history.pop();
    return true;
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    if (this.undoHistory.length <= 0) {
      return false;
    }
    if (this.undoHistory[this.undoHistory.length - 1] === this.state) {
      return false;
    }
    this.state = this.undoHistory[this.undoHistory.length - 1];
    this.history.push(this.undoHistory.pop());
    return true;
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this.history = [];
    this.undoHistory = [];
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
