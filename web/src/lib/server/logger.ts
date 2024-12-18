import { createLogger as createWinston, format, transports } from "winston";
import { syslog } from "winston/lib/winston/config";

export default function createLogger() {
	return createWinston({
		level: "info",
		levels: syslog.levels,
		format: format.combine(format.timestamp(), format.json()),
		transports: [getConsoleTransport()]
	});
}

function getConsoleTransport() {
	return new transports.Console({
		format: isProd
			? format.combine(format.timestamp(), format.json())
			: format.combine(
					format.timestamp(),
					format.colorize(),
					format.printf(({ timestamp, level, message, ...rest }) => {
						if (Object.keys(rest).length === 0) {
							return `[${timestamp}] ${level} ${message}`;
						}
						return `[${timestamp}] ${level} ${message} ${JSON.stringify(rest)}`;
					})
				),
		forceConsole: !isProd,
		level: isProd ? "warn" : "info"
	});
}

const isProd = process.env.NODE_ENV === "production";
