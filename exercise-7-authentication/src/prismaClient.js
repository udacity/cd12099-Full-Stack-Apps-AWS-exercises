import { PrismaClient } from '@prisma/client';
import AWSXRay from 'aws-xray-sdk';

const getQueryWithParams= (query, params) => {
    let i = 1
    while (query.indexOf('$') >= 0) {
      query = query.replace(
      query[query.indexOf('$')] + query[query.indexOf('$') + 1],
  `"${params[i - 1]}"`)
      i++
    }
    return query
    }

const onQueryEvent = async (e) => {
    try {
        console.log('on query')
        const segment = AWSXRay.getSegment()
        if (segment) {    
            console.log('segment')
            const paramsArr = JSON.parse(e.params)
            const query = getQueryWithParams(e.query, paramsArr)
            // X-Ray wants the time in seconds -> ms * 1e-3
            const start_time = e.timestamp.valueOf() * 1e-3 
            const end_time = (e.timestamp.valueOf() + e.duration) * 1e-3
            
            // Add a new Subsegment to parent Segment
            const subSegment = segment.addNewSubsegment('postgres')
            // Add data to the segment
            subSegment.addSqlData({ sanitized_query: query })
            subSegment.addAttribute('start_time', start_time)
            subSegment.addAttribute('end_time', end_time)
            // Set in_progress to false so subSegment 
            // will be send to xray on streamSubsegments()
            subSegment.addAttribute('in_progress', false)
            subSegment.streamSubsegments()
        }
    } catch (e) {
        console.log(e)
    }
}

const prisma = new PrismaClient({
log: [
    {
    emit: 'event',
    level: 'query',
    }
],
})

prisma.$on('query', onQueryEvent)
  
export default prisma