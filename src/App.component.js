import React, { Component } from 'react';
import { 
  BodyWrapper,
  RightWrapper,
  LeftWrapper,
  Counter,
  TimeWrapper 
} from './App.style';
import { Form, Input, Button, Modal } from 'antd';

const FormItem = Form.Item;

class App extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, setTime } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        setTime({
          startTime: values.startTime,
          endTime: values.endTime 
        });
        this.generateCountdown(values);
        form.resetFields();
      }
    });
  };

  convertTimeToSeconds = timeData => {
    let hours = 0, minutes = 0, seconds = 0;
    const getHours = hours => hours * 3600;
    const getMinutes = minutes => minutes * 60;

    if (timeData.length > 2) {
      hours = getHours(parseInt(timeData[0], 10));
      minutes = getMinutes(parseInt(timeData[1], 10));
      seconds = parseInt(timeData[2], 10);
    } else if (timeData.length > 1) {
      minutes = getMinutes(parseInt(timeData[0], 10));
      seconds = parseInt(timeData[1], 10);
    } else {
      seconds = parseInt(timeData[0], 10);
    }

    return hours+minutes+seconds;
  };
 
  generateCountdown = ({startTime, endTime}) => { 
    const { updateCounter, setNumberDiff, clearState } = this.props;
    const startTimeData = this.convertTimeToSeconds(startTime.split(':'));
    const endTimeData = this.convertTimeToSeconds(endTime.split(':'));

    clearInterval(this.countDownInterval);
    if (startTimeData > endTimeData) {
      clearState();
      Modal.error({
        title: 'Error input',
        content: 'End time is not later than start time!',
      });
      return;
    }
    
    const numberDiffStartEndTime = endTimeData - startTimeData;
    setNumberDiff(numberDiffStartEndTime);
    let timer = startTimeData, hours, minutes, seconds;
    this.countDownInterval = setInterval(() => {
      hours = parseInt(timer / (60 * 60), 10);
      minutes = parseInt((timer % (60 * 60)) / 60, 10);
      seconds = parseInt(timer % 60, 10);

      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      const stringCurrentCounter = `${hours}:${minutes}:${seconds}`; 
      updateCounter(stringCurrentCounter);

      if (++timer > endTimeData) {
        clearInterval(this.countDownInterval);
      }
    }, 1000);
  };

  checkTimerFormat = (rule, value, callback) => {
    const timerRegex = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
    if (timerRegex.test(value)) {
      callback();
      return;
    }
    callback('Wrong format! it should be hh:mm:ss.');
  };


  render() {
    const { 
      form,
      counter,
      startTime,
      endTime,
      numberDifference
    } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <BodyWrapper>
        <LeftWrapper>
          <Form onSubmit={this.handleSubmit}>
            <FormItem 
              {...formItemLayout}
              label="Start time :"
            >
              {getFieldDecorator('startTime', {
                rules: [{ validator: this.checkTimerFormat }],
              })(
                <Input size="large"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="End time :"
            >
              {getFieldDecorator('endTime', {
                rules: [{ validator: this.checkTimerFormat }],
              })(
                <Input size="large"/>
              )}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Start Countdown</Button>
            </FormItem>
          </Form>
        </LeftWrapper>
        <RightWrapper>
          <Counter>{counter}</Counter>
          {startTime && 
            <TimeWrapper>
              <span>Start Time : </span>
              <span>{startTime}</span>
            </TimeWrapper>}

          {endTime && 
            <TimeWrapper>
              <span>End Time : </span>
              <span>{endTime}</span>
            </TimeWrapper>}

          {numberDifference > 1 &&
            <TimeWrapper>
              <span>Number Difference (seconds)  : </span>
              <span>{`${numberDifference} s`}</span>
            </TimeWrapper>}
        </RightWrapper>
      </BodyWrapper>
    );
  };
};

export default Form.create()(App);
