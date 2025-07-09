'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Play, Square, Clock, Signal, AlertTriangle, CheckCircle } from 'lucide-react';

interface GPSPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface GPSTrackerProps {
  projectId?: string;
  userId?: string;
  onLocationUpdate?: (position: GPSPosition) => void;
}

export default function GPSTracker({ projectId, userId, onLocationUpdate }: GPSTrackerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<GPSPosition | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [trackingData, setTrackingData] = useState({
    taskName: '',
    workType: '',
    description: '',
    roadSide: '',
    startChainage: '',
    endChainage: '',
  });
  const [status, setStatus] = useState<'idle' | 'tracking' | 'error' | 'submitting'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [trackingHistory, setTrackingHistory] = useState<GPSPosition[]>([]);

  // Check if geolocation is available
  const isGeolocationAvailable = typeof navigator !== 'undefined' && 'geolocation' in navigator;

  const updatePosition = useCallback((position: GeolocationPosition) => {
    const gpsPosition: GPSPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: Date.now(),
    };

    setCurrentPosition(gpsPosition);
    setAccuracy(position.coords.accuracy);
    setLastUpdate(new Date());
    setTrackingHistory(prev => [...prev.slice(-99), gpsPosition]); // Keep last 100 positions

    if (onLocationUpdate) {
      onLocationUpdate(gpsPosition);
    }
  }, [onLocationUpdate]);

  const handleError = useCallback((error: GeolocationPositionError) => {
    let errorMessage = 'Unknown GPS error';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'GPS access denied. Please enable location permissions.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'GPS position unavailable. Check your device settings.';
        break;
      case error.TIMEOUT:
        errorMessage = 'GPS request timed out. Please try again.';
        break;
    }
    setError(errorMessage);
    setStatus('error');
  }, []);

  const startTracking = () => {
    if (!isGeolocationAvailable) {
      setError('Geolocation is not supported by this browser');
      setStatus('error');
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const id = navigator.geolocation.watchPosition(updatePosition, handleError, options);
    setWatchId(id);
    setIsTracking(true);
    setStatus('tracking');
    setError(null);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
    setStatus('idle');
  };

  const submitGPSEntry = async () => {
    if (!currentPosition || !projectId) {
      setError('Missing GPS position or project information');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('/api/v1/gps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          description: trackingData.description,
          projectId,
          userId,
          taskName: trackingData.taskName,
          workType: trackingData.workType,
          roadSide: trackingData.roadSide,
          startChainage: trackingData.startChainage,
          endChainage: trackingData.endChainage,
          taskDescription: trackingData.description,
        }),
      });

      if (response.ok) {
        setStatus('idle');
        setTrackingData({
          taskName: '',
          workType: '',
          description: '',
          roadSide: '',
          startChainage: '',
          endChainage: '',
        });
        alert('GPS entry submitted successfully!');
      } else {
        throw new Error('Failed to submit GPS entry');
      }
    } catch (error) {
      setError('Failed to submit GPS entry. Please try again.');
      setStatus('error');
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy <= 5) return 'text-green-600';
    if (accuracy <= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSignalStrength = (accuracy: number) => {
    if (accuracy <= 5) return { strength: 'Excellent', color: 'bg-green-500' };
    if (accuracy <= 10) return { strength: 'Good', color: 'bg-yellow-500' };
    if (accuracy <= 20) return { strength: 'Fair', color: 'bg-orange-500' };
    return { strength: 'Poor', color: 'bg-red-500' };
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  if (!isGeolocationAvailable) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          GPS tracking is not available on this device or browser.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* GPS Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Real-Time GPS Tracker
          </CardTitle>
          <CardDescription>
            Track your current location for field work and site inspections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status and Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant={isTracking ? 'default' : 'secondary'}
                className={isTracking ? 'bg-green-500' : ''}
              >
                {isTracking ? (
                  <>
                    <Signal className="h-3 w-3 mr-1" />
                    Tracking Active
                  </>
                ) : (
                  'Tracking Stopped'
                )}
              </Badge>
              {status === 'error' && (
                <Badge variant="destructive">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Error
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              {!isTracking ? (
                <Button onClick={startTracking} size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Start Tracking
                </Button>
              ) : (
                <Button onClick={stopTracking} variant="outline" size="sm">
                  <Square className="h-4 w-4 mr-1" />
                  Stop Tracking
                </Button>
              )}
            </div>
          </div>

          {/* Current Position Display */}
          {currentPosition && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-sm font-medium">Latitude</Label>
                <p className="font-mono text-sm">{currentPosition.latitude.toFixed(6)}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Longitude</Label>
                <p className="font-mono text-sm">{currentPosition.longitude.toFixed(6)}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Accuracy</Label>
                <p className={`font-mono text-sm ${getAccuracyColor(accuracy)}`}>
                  ±{accuracy.toFixed(1)}m
                </p>
              </div>
            </div>
          )}

          {/* Signal Quality Indicator */}
          {currentPosition && (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-16 rounded ${getSignalStrength(accuracy).color}`} />
              <span className="text-sm">
                Signal: {getSignalStrength(accuracy).strength}
              </span>
              {lastUpdate && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* GPS Entry Form */}
      {currentPosition && projectId && (
        <Card>
          <CardHeader>
            <CardTitle>Record GPS Entry</CardTitle>
            <CardDescription>
              Add task details for this GPS location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taskName">Task Name</Label>
                <Input
                  id="taskName"
                  value={trackingData.taskName}
                  onChange={(e) => setTrackingData(prev => ({ ...prev, taskName: e.target.value }))}
                  placeholder="e.g., Site Inspection"
                />
              </div>
              <div>
                <Label htmlFor="workType">Work Type</Label>
                <Select
                  value={trackingData.workType}
                  onValueChange={(value) => setTrackingData(prev => ({ ...prev, workType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Survey and Design">Survey and Design</SelectItem>
                    <SelectItem value="Road Construction">Road Construction</SelectItem>
                    <SelectItem value="Bridge Construction">Bridge Construction</SelectItem>
                    <SelectItem value="Road Maintenance">Road Maintenance</SelectItem>
                    <SelectItem value="Quality Testing">Quality Testing</SelectItem>
                    <SelectItem value="Safety Inspection">Safety Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="roadSide">Road Side</Label>
                <Select
                  value={trackingData.roadSide}
                  onValueChange={(value) => setTrackingData(prev => ({ ...prev, roadSide: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select side" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Left">Left</SelectItem>
                    <SelectItem value="Right">Right</SelectItem>
                    <SelectItem value="Center">Center</SelectItem>
                    <SelectItem value="Both">Both Sides</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startChainage">Start Chainage</Label>
                <Input
                  id="startChainage"
                  value={trackingData.startChainage}
                  onChange={(e) => setTrackingData(prev => ({ ...prev, startChainage: e.target.value }))}
                  placeholder="e.g., 10+500"
                />
              </div>
              <div>
                <Label htmlFor="endChainage">End Chainage</Label>
                <Input
                  id="endChainage"
                  value={trackingData.endChainage}
                  onChange={(e) => setTrackingData(prev => ({ ...prev, endChainage: e.target.value }))}
                  placeholder="e.g., 11+000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Task Description</Label>
              <Textarea
                id="description"
                value={trackingData.description}
                onChange={(e) => setTrackingData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the work being performed at this location..."
                rows={3}
              />
            </div>

            <Button
              onClick={submitGPSEntry}
              disabled={status === 'submitting' || !trackingData.taskName || !trackingData.workType}
              className="w-full"
            >
              {status === 'submitting' ? (
                'Submitting...'
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit GPS Entry
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tracking History */}
      {trackingHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tracking Session</CardTitle>
            <CardDescription>
              Recent GPS positions from this session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Total Points:</span>
                <span className="font-medium">{trackingHistory.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Session Duration:</span>
                <span className="font-medium">
                  {trackingHistory.length > 1 &&
                    `${Math.round((trackingHistory[trackingHistory.length - 1].timestamp - trackingHistory[0].timestamp) / 1000 / 60)}m`
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span>Average Accuracy:</span>
                <span className="font-medium">
                  ±{(trackingHistory.reduce((sum, pos) => sum + pos.accuracy, 0) / trackingHistory.length).toFixed(1)}m
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
