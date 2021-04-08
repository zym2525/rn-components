package com.rncomponents.smartrefreshlayout.event;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class HeaderMovingEvent extends Event<HeaderMovingEvent> {
  public static final String EVENT_NAME = "onHeaderMoving";

  private WritableMap mParams;
  public HeaderMovingEvent(int viewId,WritableMap params) {
    super(viewId);
    mParams = params;
  }

  @Override
  public String getEventName() {
    return EVENT_NAME;
  }

  @Override
  public short getCoalescingKey() {
    // All events for a given view can be coalesced.
    return 0;
  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(),mParams);
  }
}
