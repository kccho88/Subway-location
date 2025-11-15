import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const API_KEY = '774a4e43776b6363363248655a6b42';
const API_BASE_URL = 'http://swopenAPI.seoul.go.kr/api/subway';

const SUBWAY_LINES = [
  '1호선',
  '2호선',
  '3호선',
  '4호선',
  '5호선',
  '6호선',
  '7호선',
  '8호선',
  '9호선',
  '경의중앙선',
  '공항철도',
  '수인분당선',
  '신분당선',
  '경춘선',
  '우이신설선',
  '서해선',
  '김포골드라인'
];

function App() {
  const [searchMode, setSearchMode] = useState('line'); // 'line' or 'station'
  const [selectedLine, setSelectedLine] = useState('');
  const [stationName, setStationName] = useState('');
  const [trainData, setTrainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(100);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchTrainData = useCallback(async (line, start = 1, end = 100) => {
    if (!line) return;

    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}/${API_KEY}/json/realtimePosition/${start}/${end}/${encodeURIComponent(line)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.RESULT && data.RESULT.CODE !== 'INFO-000') {
        throw new Error(data.RESULT.MESSAGE || 'API 오류가 발생했습니다.');
      }

      // API 응답 구조에 따라 데이터 배열 찾기
      const trainList = data.realtimePositionList || 
                       data.realtimePosition || 
                       (Array.isArray(data) ? data : []);
      
      if (trainList && trainList.length > 0) {
        // 디버깅: 첫 번째 데이터의 날짜 형식 확인
        if (trainList[0] && (trainList[0].recptnDt || trainList[0].lastRecptnDt)) {
          console.log('날짜 형식 샘플:', {
            recptnDt: trainList[0].recptnDt,
            lastRecptnDt: trainList[0].lastRecptnDt
          });
        }
        return trainList;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err.message || '데이터를 가져오는 중 오류가 발생했습니다.');
    }
  }, []);

  // 역별 검색: 모든 호선을 검색하여 역 이름으로 필터링
  const searchByStation = useCallback(async (station, start = 1, end = 100) => {
    if (!station || station.trim() === '') return;

    setLoading(true);
    setError(null);

    try {
      const allTrainData = [];
      const searchTerm = station.trim();

      // 모든 호선을 병렬로 검색
      const promises = SUBWAY_LINES.map(line => 
        fetchTrainData(line, start, end).catch(err => {
          console.warn(`${line} 검색 실패:`, err.message);
          return [];
        })
      );

      const results = await Promise.all(promises);
      
      // 모든 결과를 합치고 역 이름으로 필터링
      results.forEach(trainList => {
        if (Array.isArray(trainList)) {
          const filtered = trainList.filter(train => 
            train.statnNm && train.statnNm.includes(searchTerm)
          );
          allTrainData.push(...filtered);
        }
      });

      // 중복 제거 (같은 열차 번호와 역 ID 조합)
      const uniqueTrains = Array.from(
        new Map(
          allTrainData.map(train => [`${train.trainNo}-${train.statnId}`, train])
        ).values()
      );

      setTrainData(uniqueTrains);
      setTotalCount(uniqueTrains.length);
    } catch (err) {
      setError(err.message || '역별 검색 중 오류가 발생했습니다.');
      setTrainData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [fetchTrainData]);

  // 호선별 검색 (기존 로직)
  const searchByLine = useCallback(async (line, start = 1, end = 100) => {
    if (!line) return;

    setLoading(true);
    setError(null);

    try {
      const trainList = await fetchTrainData(line, start, end);
      setTrainData(trainList);
      setTotalCount(trainList.length);
    } catch (err) {
      setError(err.message || '데이터를 가져오는 중 오류가 발생했습니다.');
      setTrainData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [fetchTrainData]);

  useEffect(() => {
    if (searchMode === 'line' && selectedLine) {
      searchByLine(selectedLine, startIndex, endIndex);
    }
    // 역별 검색은 검색 버튼 클릭 또는 Enter 키로만 실행
  }, [searchMode, selectedLine, startIndex, endIndex, searchByLine]);

  useEffect(() => {
    let interval = null;
    if (autoRefresh) {
      if (searchMode === 'line' && selectedLine) {
        interval = setInterval(() => {
          searchByLine(selectedLine, startIndex, endIndex);
        }, 30000); // 30초마다 새로고침
      } else if (searchMode === 'station' && stationName) {
        interval = setInterval(() => {
          searchByStation(stationName, startIndex, endIndex);
        }, 30000);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, searchMode, selectedLine, stationName, startIndex, endIndex, searchByLine, searchByStation]);

  const handleSearchModeChange = (mode) => {
    setSearchMode(mode);
    setSelectedLine('');
    setStationName('');
    setTrainData([]);
    setStartIndex(1);
    setEndIndex(100);
    setError(null);
  };

  const handleLineChange = (e) => {
    const line = e.target.value;
    setSelectedLine(line);
    setStartIndex(1);
    setEndIndex(100);
    setTrainData([]);
  };

  const handleStationChange = (e) => {
    const station = e.target.value;
    setStationName(station);
    // 역 이름 변경 시 자동 검색하지 않음 (검색 버튼 클릭 또는 Enter 키로만 검색)
  };

  const handleStationSearch = () => {
    if (stationName.trim()) {
      searchByStation(stationName.trim(), startIndex, endIndex);
    }
  };

  const handleRefresh = () => {
    if (searchMode === 'line' && selectedLine) {
      searchByLine(selectedLine, startIndex, endIndex);
    } else if (searchMode === 'station' && stationName) {
      searchByStation(stationName, startIndex, endIndex);
    }
  };

  const handleLoadMore = () => {
    const newEndIndex = endIndex + 100;
    setEndIndex(newEndIndex);
  };

  const getDirectionText = (updnLine) => {
    if (updnLine === '0') return '상행/내선';
    if (updnLine === '1') return '하행/외선';
    return '알 수 없음';
  };

  const getStatusText = (trainSttus) => {
    const statusMap = {
      '0': '진입',
      '1': '도착',
      '2': '출발',
      '3': '전역 출발'
    };
    return statusMap[trainSttus] || '알 수 없음';
  };

  const getExpressText = (directAt) => {
    if (directAt === '1') return '급행';
    if (directAt === '7') return '특급';
    return '일반';
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr || dateTimeStr === '') return '-';
    
    try {
      // 문자열에서 숫자만 추출
      const numericStr = dateTimeStr.toString().replace(/\D/g, '');
      
      // YYYYMMDDHHmmss 형식 (14자리) 처리
      if (numericStr.length === 14) {
        const year = numericStr.substring(0, 4);
        const month = numericStr.substring(4, 6);
        const day = numericStr.substring(6, 8);
        const hour = numericStr.substring(8, 10);
        const minute = numericStr.substring(10, 12);
        const second = numericStr.substring(12, 14);
        
        // 유효성 검사
        const yearNum = parseInt(year, 10);
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
        const hourNum = parseInt(hour, 10);
        const minuteNum = parseInt(minute, 10);
        const secondNum = parseInt(second, 10);
        
        // 현재 연도 기준으로 유효성 검사 (2000년 이후, 현재 연도 이하)
        const currentYear = new Date().getFullYear();
        if (yearNum >= 2000 && yearNum <= currentYear + 1 && 
            monthNum >= 1 && monthNum <= 12 && 
            dayNum >= 1 && dayNum <= 31 && 
            hourNum >= 0 && hourNum <= 23 && 
            minuteNum >= 0 && minuteNum <= 59 &&
            secondNum >= 0 && secondNum <= 59) {
          return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        }
      }
      
      // YYYYMMDDHHmm 형식 (12자리) 처리
      if (numericStr.length === 12) {
        const year = numericStr.substring(0, 4);
        const month = numericStr.substring(4, 6);
        const day = numericStr.substring(6, 8);
        const hour = numericStr.substring(8, 10);
        const minute = numericStr.substring(10, 12);
        
        const yearNum = parseInt(year, 10);
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
        const hourNum = parseInt(hour, 10);
        const minuteNum = parseInt(minute, 10);
        
        const currentYear = new Date().getFullYear();
        if (yearNum >= 2000 && yearNum <= currentYear + 1 && 
            monthNum >= 1 && monthNum <= 12 && 
            dayNum >= 1 && dayNum <= 31 && 
            hourNum >= 0 && hourNum <= 23 && 
            minuteNum >= 0 && minuteNum <= 59) {
          return `${year}-${month}-${day} ${hour}:${minute}:00`;
        }
      }
      
      // 이미 포맷된 형식인 경우 (YYYY-MM-DD HH:mm:ss)
      if (dateTimeStr.includes('-') && dateTimeStr.includes(':')) {
        // 형식이 올바른지 확인
        const dateMatch = dateTimeStr.match(/(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})/);
        if (dateMatch) {
          const [, year, month, day, hour, minute, second] = dateMatch;
          return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
        }
        return dateTimeStr;
      }
      
      // ISO 형식 또는 다른 표준 형식으로 파싱 시도
      const date = new Date(dateTimeStr);
      if (!isNaN(date.getTime())) {
        // 유효한 날짜인지 확인 (2000년 이후)
        if (date.getFullYear() >= 2000) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hour = String(date.getHours()).padStart(2, '0');
          const minute = String(date.getMinutes()).padStart(2, '0');
          const second = String(date.getSeconds()).padStart(2, '0');
          return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        }
      }
      
      // 파싱 실패 시 원본 반환 (디버깅을 위해)
      console.warn('날짜 파싱 실패:', dateTimeStr, '숫자만 추출:', numericStr);
      return dateTimeStr;
    } catch (e) {
      console.error('날짜 파싱 오류:', e, dateTimeStr);
      return dateTimeStr;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🚇 서울시 지하철 실시간 위치</h1>
          <p>서울특별시 교통정보 시스템(TOPIS) 실시간 열차 위치 조회</p>
        </header>

        <div className="controls">
          {/* 검색 모드 전환 */}
          <div className="search-mode-tabs">
            <button
              className={`mode-tab ${searchMode === 'line' ? 'active' : ''}`}
              onClick={() => handleSearchModeChange('line')}
            >
              🚇 호선별 검색
            </button>
            <button
              className={`mode-tab ${searchMode === 'station' ? 'active' : ''}`}
              onClick={() => handleSearchModeChange('station')}
            >
              🏢 역별 검색
            </button>
          </div>

          {/* 호선별 검색 */}
          {searchMode === 'line' && (
            <div className="control-group">
              <label htmlFor="subway-line">지하철 호선 선택:</label>
              <select
                id="subway-line"
                value={selectedLine}
                onChange={handleLineChange}
                className="select-input"
              >
                <option value="">호선을 선택하세요</option>
                {SUBWAY_LINES.map((line) => (
                  <option key={line} value={line}>
                    {line}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 역별 검색 */}
          {searchMode === 'station' && (
            <div className="control-group">
              <label htmlFor="station-name">역 이름 입력:</label>
              <div className="station-search-group">
                <input
                  id="station-name"
                  type="text"
                  value={stationName}
                  onChange={handleStationChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleStationSearch();
                    }
                  }}
                  placeholder="예: 서울역, 강남, 종로3가"
                  className="station-input"
                />
                <button
                  onClick={handleStationSearch}
                  disabled={!stationName.trim() || loading}
                  className="btn btn-primary"
                >
                  🔍 검색
                </button>
              </div>
            </div>
          )}

          <div className="button-group">
            <button
              onClick={handleRefresh}
              disabled={
                (searchMode === 'line' && !selectedLine) ||
                (searchMode === 'station' && !stationName.trim()) ||
                loading
              }
              className="btn btn-primary"
            >
              {loading ? '로딩 중...' : '🔄 새로고침'}
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`btn ${autoRefresh ? 'btn-active' : 'btn-secondary'}`}
              disabled={
                (searchMode === 'line' && !selectedLine) ||
                (searchMode === 'station' && !stationName.trim())
              }
            >
              {autoRefresh ? '⏸️ 자동 새로고침 중지' : '▶️ 자동 새로고침 시작 (30초)'}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <strong>오류:</strong> {error}
          </div>
        )}

        {((searchMode === 'line' && selectedLine) || (searchMode === 'station' && stationName)) && !loading && !error && (
          <div className="info-bar">
            <span>
              {searchMode === 'station' && stationName && `"${stationName}" 검색 결과: `}
              총 {totalCount}개의 열차 정보
            </span>
            {totalCount > endIndex && searchMode === 'line' && (
              <button onClick={handleLoadMore} className="btn btn-secondary">
                더 보기 ({endIndex + 1} ~ {Math.min(endIndex + 100, totalCount)})
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>데이터를 불러오는 중...</p>
          </div>
        )}

        {!loading && trainData.length > 0 && (
          <div className="table-container">
            <table className="train-table">
              <thead>
                <tr>
                  <th>열차 번호</th>
                  <th>현재 역</th>
                  <th>방향</th>
                  <th>상태</th>
                  <th>종착역</th>
                  <th>급행 여부</th>
                  <th>막차</th>
                  <th>수신 시간</th>
                </tr>
              </thead>
              <tbody>
                {trainData.map((train, index) => (
                  <tr key={`${train.trainNo}-${train.statnId}-${index}`}>
                    <td>{train.trainNo || '-'}</td>
                    <td>{train.statnNm || '-'}</td>
                    <td>{getDirectionText(train.updnLine)}</td>
                    <td>
                      <span className={`status-badge status-${train.trainSttus}`}>
                        {getStatusText(train.trainSttus)}
                      </span>
                    </td>
                    <td>{train.statnTnm || '-'}</td>
                    <td>
                      <span className={`express-badge ${train.directAt === '1' || train.directAt === '7' ? 'express' : ''}`}>
                        {getExpressText(train.directAt)}
                      </span>
                    </td>
                    <td>{train.lstcarAt === '1' ? '✅ 예' : '❌ 아니오'}</td>
                    <td className="datetime-cell">{formatDateTime(train.recptnDt || train.lastRecptnDt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && 
         ((searchMode === 'line' && selectedLine) || (searchMode === 'station' && stationName)) && 
         trainData.length === 0 && 
         !error && (
          <div className="no-data">
            <p>
              {searchMode === 'line' 
                ? '현재 선택한 호선에 대한 열차 정보가 없습니다.'
                : `"${stationName}" 역에 대한 열차 정보가 없습니다.`}
            </p>
          </div>
        )}

        {!((searchMode === 'line' && selectedLine) || (searchMode === 'station' && stationName)) && (
          <div className="welcome-message">
            <p>
              {searchMode === 'line'
                ? '위에서 지하철 호선을 선택하여 실시간 열차 위치를 확인하세요.'
                : '위에서 역 이름을 입력하여 해당 역의 실시간 열차 정보를 확인하세요.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

