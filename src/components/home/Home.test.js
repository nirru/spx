import React from 'react';
import { shallow,mount } from 'enzyme';
import {elapsedTime, getHostName} from "./Utility";
import {FeedList} from "./FeedList";
import {mockFeedList} from "../../__mock__/mock_feed_list";


let wrapper;
// beforeEach(() => {
//
//     wrapper = mount(<Home/>);
// });
describe('Home Component', function () {

    it('should check button called or not', function () {
        const previousCall = jest.fn();
        wrapper = shallow(<div className="btn-next-prev">
            <button className= "next" onClick={previousCall}>Previous</button>
        </div>)
        wrapper.find('button').at(0).simulate('click');
        expect(previousCall).toBeCalledTimes(1);
    });

    it('should check feedList render correctly', function () {
        wrapper = shallow(<FeedList hits={mockFeedList.hits}
                                    getHostName = {jest.fn}
                                    elapsedTime = {jest.fn}
                                    hide        = {jest.fn}
                                    upVote      = {jest.fn}

        />)
        expect(wrapper.find('div').length).toBe(5);
    });
});